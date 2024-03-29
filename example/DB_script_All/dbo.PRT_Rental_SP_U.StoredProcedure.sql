USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Rental_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2019-12-20
-- Update date	: 
-- Description	: 
/*

*/
-- ==============================================================
CREATE PROC [dbo].[PRT_Rental_SP_U]

	@stc_cnt					int,						-- PK
	@prt_id						int,						-- PK
	@identifier					varchar(20)		= NULL,
	@state_cd					char(1)			= NULL,
	@memo						nvarchar(100)	= NULL,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- DECLARE LOCAL ---- */


	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION
	
		
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @stc_cnt <= 0 OR @stc_cnt IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @stc_cnt ', 16, @RESULT);
		END
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_Rental WHERE prt_id = @prt_id AND stc_cnt = @stc_cnt)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Rental ', 16, @RESULT);
		END	

		-- 검사 (중복)
		IF LEN(@identifier) > 0 
			AND EXISTS(SELECT * FROM PRT_Rental WHERE identifier = @identifier AND prt_id = @prt_id)
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 중복 : prt_id 기준 @identifier ', 16, @RESULT);				
		END		

		/*******************************************************/
		-- 처리 (수정)
		UPDATE PRT_Rental 
		SET
			identifier = CASE WHEN @identifier IS NULL THEN identifier ELSE @identifier END,
			state_cd = CASE WHEN @state_cd IS NULL THEN state_cd ELSE @state_cd END,
			memo = CASE WHEN @memo IS NULL THEN memo ELSE @memo END
		WHERE
			prt_id = @prt_id AND stc_cnt = @stc_cnt
		
		
		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION
		
		RETURN @RESULT
		
	END TRY
	BEGIN CATCH /***********************************************/
		/* ----- DECLARE CATCH ---- */
		DECLARE @errorMessage	nvarchar(1000)	= ERROR_MESSAGE();
		DECLARE @errorSeverity	int				= ERROR_SEVERITY();
		DECLARE @errorState		int				= ERROR_SEVERITY();
		DECLARE @procName		nvarchar(128)	= OBJECT_NAME(@@PROCID);
        
        /* ----- TRANSACTION ------ */
        IF @tranCounter = 0  
		BEGIN
			ROLLBACK TRANSACTION;
			EXEC [SYS_ErrorLog_SP_C] @procName, @msgPrint_yn, @msgSave_yn;
			RETURN -@errorState;
		END
        ELSE
        BEGIN
            IF XACT_STATE() <> -1  
                ROLLBACK TRANSACTION  ProcedureSave;
			SET @errorMessage = @procName +' >> '+ @errorMessage;
			RAISERROR(@errorMessage, @errorSeverity, @errorState);
		END
	END CATCH
	SET NOCOUNT OFF	
END

-- ##############################################################
-- #### TEST AREA
/*
	exec [PRT_Rental_SP_U] @prt_id=1, @stc_cnt=1
	exec [PRT_Rental_SP_U] @prt_id=1, @stc_cnt=2, @identifier='AAA'
	exec [PRT_Rental_SP_U] @prt_id=1, @stc_cnt=3, @identifier='BBB'

-- 오류 : 중복	
	exec [PRT_Rental_SP_U] @prt_id=1, @stc_cnt=2, @identifier='AAA'
	
	select * from PRT_Rental
	
*/



GO
