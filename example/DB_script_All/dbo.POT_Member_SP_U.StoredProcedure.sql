USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[POT_Member_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[POT_Member_SP_U]

	@meb_idx					int,
	@total_it					int,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION
	
		
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @meb_idx <= 0 or @meb_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @meb_idx ', 16, @RESULT);
		END
		IF @total_it IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @total_it ', 16, @RESULT);
		END
		
		
		------------------------------------------------
		-- REVIEW:: 음수가 나올경우 관리자에 알려줘야함
		
	
		/*******************************************************/
		-- 처리 (수정) : 없을 경우 생성
		IF NOT EXISTS(SELECT * FROM POT_Member WHERE meb_idx = @meb_idx)
			EXEC [POT_Member_SP_C] @meb_idx=@meb_idx, @total_it=@total_it			
		ELSE 
		BEGIN
			UPDATE POT_Member 
			SET
				total_it = @total_it,
				update_dt = GETDATE()
			WHERE 
				meb_idx = @meb_idx
		END

		
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
	exec [POT_Member_SP_U]	3, 10		

	select * from POT_Member
	select * from MEB_Master
	
*/



GO
