USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[DGN_Popup_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[DGN_Popup_SP_C]

	@title						nvarchar(20),
	@type_cd					char(1)			= 'S',
	@contents					nvarchar(2000)	= '',
	@width_it					int				= 100,
	@height_it					int				= 100,
	@xPosition_cd				char(1)			= 'S',
	@yPosition_cd				char(1)			= 'T',
	@begin_dt					datetime		= NULL,
	@close_dt					datetime		= NULL,
	@active_yn					char(1)			= 'Y',

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
		IF LEN(@title) <= 0 OR @title IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @title ', 16, @RESULT);
		END

		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO DGN_Popup
		(
			title,
			type_cd,
			contents,
			width_it,
			height_it,
			xPosition_cd,
			yPosition_cd,
			begin_dt,
			close_dt,
			active_yn
		)
		VALUES
		(
			@title,
			@type_cd,
			@contents,
			@width_it,
			@height_it,
			@xPosition_cd,
			@yPosition_cd,
			@begin_dt,
			@close_dt,
			@active_yn
		)

		
		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

		SET @RESULT = @@IDENTITY					
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
exec [DGN_Popup_SP_C] @title='타이틀', @width_it=10, @height_it=20, xPosition_cd='T'

select * from DGN_Popup

	
*/



GO
