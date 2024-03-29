USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_QnA_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_QnA_SP_U]

	@qna_idx					int,						-- PK
	
	@title						nvarchar(20)	= NULL,
	@writer						nvarchar(10)	= NULL,
	@contents					nvarchar(2000)	= NULL,
	@meb_idx					int				= NULL,
	@passwd						varchar(20)		= NULL,
	@open_yn					char(1)			= NULL,
	@answer						nvarchar(2000)	= NULL,
	@state_cd					char(1)			= NULL,
	
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
		IF @qna_idx <= 0 OR @qna_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @qna_idx ', 16, @RESULT);
		END



		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_QnA WHERE qna_idx = @qna_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_QnA ', 16, @RESULT);
		END

		

		/*******************************************************/
		-- 처리 (수정)
		UPDATE PRT_QnA 
		SET
			title = CASE WHEN @title IS NULL THEN title ELSE @title END,
			writer = CASE WHEN @writer IS NULL THEN writer ELSE @writer END,
			contents = CASE WHEN @contents IS NULL THEN contents ELSE @contents END,
			meb_idx = CASE WHEN @meb_idx IS NULL THEN meb_idx ELSE @meb_idx END,
			passwd = CASE WHEN @passwd IS NULL THEN passwd ELSE @passwd END,
			open_yn = CASE WHEN @open_yn IS NULL THEN open_yn ELSE @open_yn END,
			answer = CASE WHEN @answer IS NULL THEN answer ELSE @answer END,
			answer_dt = CASE WHEN @state_cd  !='F' THEN answer_dt ELSE getdate() END,
			state_cd = CASE WHEN @state_cd IS NULL THEN state_cd ELSE @state_cd END
		WHERE
			 qna_idx = @qna_idx
		
		
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
	exec [PRT_QnA_SP_U]

	select * from PRT_QnA
	
*/



GO
