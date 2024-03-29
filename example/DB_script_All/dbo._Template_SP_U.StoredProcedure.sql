USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[_Template_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[_Template_SP_U]

	@faq_idx					int,						-- PK
	@question					nvarchar(1000)	= NULL,
	@answer						nvarchar(1000)	= NULL,
	@typeCode					varchar(5)		= NULL,
	@rank_it					smallint		= NULL,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE LOCAL ---- */
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
		IF @faq_idx <= 0 OR @faq_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @faq_idx ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM BOD_FAQ WHERE faq_idx = @faq_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : BOD_FAQ ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정)
		UPDATE BOD_FAQ 
		SET
			question = CASE WHEN @question IS NULL THEN question ELSE @question END,
			answer = CASE WHEN @answer IS NULL THEN answer ELSE @answer END,
			typeCode = CASE WHEN @typeCode IS NULL THEN typeCode ELSE @typeCode END,
			rank_it = CASE WHEN @rank_it IS NULL THEN rank_it ELSE @rank_it END
		WHERE
			faq_idx = @faq_idx
		
		
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
	exec [BOD_FAQ_SP_U] @faq_idx=1
	exec [BOD_FAQ_SP_U] @faq_idx=1, @answer='답변이요'
	
	select * from BOD_FAQ
	
*/





GO
