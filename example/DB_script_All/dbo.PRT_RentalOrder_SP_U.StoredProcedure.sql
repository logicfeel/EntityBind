USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_RentalOrder_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_RentalOrder_SP_U]

	@ro_idx						int,						-- PK
	@stc_cnt					int,						-- PK
	@prt_id						int,						-- PK
	@begin_dt					smalldatetime	= NULL,
	@close_dt					smalldatetime	= NULL,
	@ord_id						varchar(14)		= NULL,
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
		IF @ro_idx <= 0 OR @ro_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @ro_idx ', 16, @RESULT);
		END
		IF @stc_cnt <= 0 OR @stc_cnt IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @stc_cnt ', 16, @RESULT);
		END		
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_RentalOrder 
						WHERE prt_id = @prt_id AND stc_cnt = @stc_cnt AND ro_idx =@ro_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_RentalOrder ', 16, @RESULT);
		END	

		-- 검사 (데이터)
		-- TODO:: 주문정보 검사
		

		/*******************************************************/
		-- 처리 (수정)
		UPDATE PRT_RentalOrder 
		SET
			begin_dt = CASE WHEN @begin_dt IS NULL THEN begin_dt ELSE @begin_dt END,
			close_dt = CASE WHEN @close_dt IS NULL THEN close_dt ELSE @close_dt END,
			ord_id = CASE WHEN @ord_id IS NULL THEN ord_id ELSE @ord_id END
		WHERE
			prt_id = @prt_id AND stc_cnt = @stc_cnt AND ro_idx =@ro_idx
		
		
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
	exec [PRT_RentalOrder_SP_U]	
	
	select * from PRT_RentalOrder
	
*/



GO
