USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Master_SP_D]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






-- ============================================= 
-- Author		: 김영호
-- Create date	: 2019-12-20
-- Update date	: 
-- Description	: 
/*

*/
-- =============================================
CREATE PROC [dbo].[PRT_Master_SP_D]

	@prt_id				int,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN

	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int			= 0;
	
	
	/* ----- TRANSACTION ------ */
	DECLARE @TranCounter	int = @@TRANCOUNT
    IF @TranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END

		-- prd_id 유무 검사
		IF NOT EXISTS(SELECT * FROM PRT_Master WHERE prt_id = @prt_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Master ', 16, @RESULT);
		END


		/*******************************************************/
		-- 처리
		UPDATE PRT_Master 
		SET
			update_dt	= GETDATE(),
			del_yn		= 'Y'
		WHERE
			prt_id = @prt_id
		
		
		/*******************************************************/
		-- 커밋
		/* ----- TRANSACTION ------ */
		IF @TranCounter = 0
			COMMIT TRANSACTION
		
	END TRY
	BEGIN CATCH
		/* ----- DECLARE CATCH ---- */
		DECLARE @errorMessage	nvarchar(4000)	= ERROR_MESSAGE();
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

END

-- ###################################################
-- ## 테스트 코드
/*
	EXEC [PRT_Base_SP_D] 2
	
	select * from PRT_Master
	
*/



GO
