USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[DGN_RollingImage_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[DGN_RollingImage_SP_U]

	@img_idx					int,						-- PK
	@roll_idx					int,						-- PK
	@title						nvarchar(20)	= NULL,	
	@pcURL						nvarchar(200)	= NULL,
	@mURL						nvarchar(200)	= NULL,
	@pcLink						nvarchar(200)	= NULL,
	@mLink						nvarchar(200)	= NULL,
	@active_yn					char(1)			= NULL,
	
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
		IF @roll_idx <= 0 OR @roll_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @roll_idx ', 16, @RESULT);
		END

		IF @img_idx <= 0 OR @img_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @img_idx ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM DGN_RollingImage WHERE roll_idx = @roll_idx 
			and img_idx = @img_idx )
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : DGN_RollingImage ', 16, @RESULT);
		END

		/*******************************************************/
		-- 처리 (수정)
		UPDATE DGN_RollingImage 
		SET
			title = CASE WHEN @title IS NULL THEN title ELSE @title END,
			pcUrl = CASE WHEN @pcUrl IS NULL THEN pcUrl ELSE @pcUrl END,
			mUrl = CASE WHEN @mUrl IS NULL THEN mUrl ELSE @mUrl END,
			pcLink = CASE WHEN @pcLink IS NULL THEN pcLink ELSE @pcLink END,
			mLink = CASE WHEN @mLink IS NULL THEN mLink ELSE @mLink END,
			active_yn = CASE WHEN @active_yn IS NULL THEN active_yn ELSE @active_yn END
		WHERE
			roll_idx = @roll_idx and img_idx = @img_idx
		
		
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
	exec [DGN_RollingImage_SP_U]

	
	select * from DGN_RollingImage
	
*/



GO
