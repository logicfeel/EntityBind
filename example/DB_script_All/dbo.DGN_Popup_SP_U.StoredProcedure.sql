USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[DGN_Popup_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[DGN_Popup_SP_U]

	@pop_idx					int,						-- PK
	@title						nvarchar(20)	= NULL,
	@type_cd					char(1)			= NULL,
	@contents					nvarchar(2000)	= NULL,
	@width_it					int				= NULL,
	@height_it					int				= NULL,
	@xPosition_cd				char(1)			= NULL,
	@yPosition_cd				char(1)			= NULL,
	@begin_dt					datetime		= NULL,
	@close_dt					datetime		= NULL,
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
		-- 검사 (필수값)
		IF @pop_idx <= 0 OR @pop_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @pop_idx ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM DGN_Popup WHERE pop_idx = @pop_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : DGN_Popup ', 16, @RESULT);
		END
		

		/*******************************************************/
		-- 처리 (수정)
		UPDATE DGN_Popup 
		SET
			title = CASE WHEN @title IS NULL THEN title ELSE @title END,
			type_cd = CASE WHEN @type_cd IS NULL THEN type_cd ELSE @type_cd END,
			contents = CASE WHEN @contents IS NULL THEN contents ELSE @contents END,
			width_it = CASE WHEN @width_it IS NULL THEN width_it ELSE @width_it END,
			height_it = CASE WHEN @height_it IS NULL THEN height_it ELSE @height_it END,
			xPosition_cd = CASE WHEN @xPosition_cd IS NULL THEN xPosition_cd ELSE @xPosition_cd END,
			yPosition_cd = CASE WHEN @yPosition_cd IS NULL THEN yPosition_cd ELSE @yPosition_cd END,
			begin_dt = CASE WHEN @begin_dt IS NULL THEN begin_dt ELSE @begin_dt END,
			close_dt = CASE WHEN @close_dt IS NULL THEN close_dt ELSE @close_dt END,
			active_yn = CASE WHEN @active_yn IS NULL THEN active_yn ELSE @active_yn END
		WHERE
			 pop_idx = @pop_idx
		
		
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
	exec [DGN_Popup_SP_U] @pop_idx=4, @width_it=100, @height_it=200, @xPosition_cd='S', @yPosition_cd='T', @contents='300'

	select * from DGN_Popup
	
*/



GO
