USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[DGN_RollingImage_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[DGN_RollingImage_SP_C]

	@roll_idx					int,
	@title						nvarchar(20),
	@pcURL						nvarchar(200)	= NULL,
	@mURL						nvarchar(200)	= NULL,
	@pcLink						nvarchar(200)	= NULL,
	@mLink						nvarchar(200)	= NULL,
	@active_yn					char(1)			= 'Y',
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;

	/* ----- DECLARE LOCAL ---- */
	DECLARE @img_idx			int				= 0;		

	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@title) <= 0 OR @title IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @title ', 16, @RESULT);
		END

		-- 조회
		SELECT @img_idx = (isnull(Max(a.img_idx), 0) + 1) 
		FROM DGN_RollingImage a 
		WHERE a.roll_idx = @roll_idx

		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO DGN_RollingImage
		(
			roll_idx,
			img_idx,
			title,
			pcUrl,
			mUrl,
			pcLink,
			mLink,
			active_yn
		)
		VALUES
		(
			@roll_idx,
			@img_idx,
			@title,
			@pcUrl,
			@mUrl,
			@pcLink,
			@mLink,
			@active_yn
		)

		
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
exec [DGN_RollingImage_SP_C] @roll_idx=1, @title= '롤링'		

select * from DGN_RollingImage
select * from DGN_Rolling

	
*/



GO
