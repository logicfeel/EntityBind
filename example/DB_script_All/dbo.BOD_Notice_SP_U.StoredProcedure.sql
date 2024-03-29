USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[BOD_Notice_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[BOD_Notice_SP_U]

	@ntc_idx					int,						-- PK
	@title						nvarchar(30)	= NULL,
	@state_cd					char(1)			= NULL,
	@top_yn						char(1)			= NULL,
	@popup_yn					char(1)			= NULL,
	@writer						nvarchar(10)	= NULL,
	@contents					nvarchar(2000)	= NULL,
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
		IF @ntc_idx <= 0 OR @ntc_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @ntc_idx ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM BOD_Notice WHERE ntc_idx = @ntc_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : BOD_Notice ', 16, @RESULT);
		END	

		-- 검사 (데이터)
		-- TODO:: 주문정보 검사
		

		/*******************************************************/
		-- 처리 (수정)
		UPDATE BOD_Notice 
		SET
			title = CASE WHEN @title IS NULL THEN title ELSE @title END,
			state_cd = CASE WHEN @state_cd IS NULL THEN state_cd ELSE @state_cd END,
			top_yn = CASE WHEN @top_yn IS NULL THEN top_yn ELSE @top_yn END,
			popup_yn = CASE WHEN @popup_yn IS NULL THEN popup_yn ELSE @popup_yn END,
			writer = CASE WHEN @writer IS NULL THEN writer ELSE @writer END,
			contents = CASE WHEN @contents IS NULL THEN contents ELSE @contents END
		WHERE
			ntc_idx = @ntc_idx
		
		
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
		DECLARE @errorState		int				= ERROR_STATE();
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
	exec [BOD_Notice_SP_U] @ntc_idx=1
	exec [BOD_Notice_SP_U] @ntc_idx=1, @writer='작성자임'

-- 오류 : 데이터	
	exec [BOD_Notice_SP_U] @ntc_idx=99, @writer='작성자임'
	
	select * from BOD_Notice
	
*/



GO
