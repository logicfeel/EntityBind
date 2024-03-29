USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[SYS_Image_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[SYS_Image_SP_U]

	@img_idx					int,						-- PK
	@file_idx					int,						-- PK
	@imgName					nvarchar(100)	= NULL,
	@orgName					nvarchar(100)	= NULL,
	@imgPath					nvarchar(200)	= NULL,
	@imgUrl						nvarchar(200)	= NULL,
	@width_it					int				= NULL,
	@height_it					int				= NULL,
	@size_it					int				= NULL,
	@thumName					nvarchar(100)	= NULL,

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
		IF @img_idx <= 0 OR @img_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @img_idx ', 16, @RESULT);
		END

		IF @file_idx <= 0 OR @file_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @file_idx ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM SYS_ImageFile WHERE img_idx = @img_idx and file_idx = @file_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : SYS_ImageFile ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정)
		UPDATE SYS_ImageFile 
		SET
			imgName = CASE WHEN @imgName IS NULL THEN imgName ELSE @imgName END,
			orgName = CASE WHEN @orgName IS NULL THEN orgName ELSE @orgName END,
			imgPath = CASE WHEN @imgPath IS NULL THEN imgPath ELSE @imgPath END,
			imgUrl = CASE WHEN @imgUrl IS NULL THEN imgUrl ELSE @imgUrl END,
			width_it = CASE WHEN @width_it IS NULL THEN width_it ELSE @width_it END,
			height_it = CASE WHEN @height_it IS NULL THEN height_it ELSE @height_it END,
			size_it = CASE WHEN @size_it IS NULL THEN size_it ELSE @size_it END,
			thumName = CASE WHEN @thumName IS NULL THEN thumName ELSE @thumName END,
			del_yn = 'N'
		WHERE img_idx = @img_idx and file_idx = @file_idx
		
		
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
	exec [SYS_Image_SP_U] @file_idx=1	-- 오류
	exec [SYS_Image_SP_U] @img_idx=13, @file_idx=1
	exec [SYS_Image_SP_U] @img_idx=13, @file_idx=1, @imgName ='1', @imgUrl='2', @imgPath='3', @orgName=4, @width_it=5
		, @height_it=6, @size_it = 7

	exec [BOD_FAQ_SP_U] @faq_idx=1, @answer='답변이요'
	
	select * from SYS_ImageFile
	
*/




GO
