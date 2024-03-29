USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[LOG_VisitInfo_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[LOG_VisitInfo_SP_C]

	@vst_idx					int,
	@visitUrl					varchar(200)	= '',
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		
	/* ----- DECLARE LOCAL ---- */
	DECLARE @vsi_idx			int
	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 처리 (opt_idx 생성)
		SELECT @vsi_idx = (ISNULL(MAX(vsi_idx), 0) + 1) 
		FROM LOG_VisitInfo WHERE vst_idx = @vst_idx
		
		
		/*******************************************************/
		-- 처리 (등록)
		IF @vsi_idx != 0
		BEGIN
			INSERT INTO LOG_VisitInfo
			(
				vst_idx,
				vsi_idx,
				visitUrl,
				time_dt
			)
			VALUES
			(
				@vst_idx,
				@vsi_idx,
				@visitUrl,
				GETDATE()
			)
		END
		
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
exec [LOG_VisitInfo_SP_C] @vst_idx=93, @visitUrl = '/Front/'


select * from LOG_Visit
select * from LOG_VisitInfo
	
*/



GO
