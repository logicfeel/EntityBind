USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[DGN_Rolling_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[DGN_Rolling_SP_U]

	@roll_idx					int,						-- PK
	@title						nvarchar(30)	= NULL,
	@help						nvarchar(100)	= NULL,
	@pcWidth_it					int				= NULL,
	@pcHeight_it				int				= NULL,
	@mWidth_it					int				= NULL,
	@mHeight_it					int				= NULL,
	@skin_it					int				= NULL,
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


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM DGN_Rolling WHERE roll_idx = @roll_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : DGN_Rolling ', 16, @RESULT);
		END

		-- 검사 (데이터)
		-- TODO:: 주문정보 검사
		

		/*******************************************************/
		-- 처리 (수정)
		UPDATE DGN_Rolling 
		SET
			title = CASE WHEN @title IS NULL THEN title ELSE @title END,
			help = CASE WHEN @help IS NULL THEN help ELSE @help END,
			pcWidth_it = CASE WHEN @pcWidth_it IS NULL THEN pcWidth_it ELSE @pcWidth_it END,
			pcHeight_it = CASE WHEN @pcHeight_it IS NULL THEN pcHeight_it ELSE @pcHeight_it END,
			mWidth_it = CASE WHEN @mWidth_it IS NULL THEN mWidth_it ELSE @mWidth_it END,
			mHeight_it = CASE WHEN @mHeight_it IS NULL THEN mHeight_it ELSE @mHeight_it END,
			skin_it = CASE WHEN @skin_it IS NULL THEN skin_it ELSE @skin_it END
		WHERE
			roll_idx = @roll_idx
		
		
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
	exec [DGN_Rolling_SP_U] @roll_idx=1, @pcWidth_it=10, @pcHeight_it=20, @mWidth_it=30, @mHeight_it=40

	
	select * from DGN_Rolling
	
*/



GO
