USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_PG_LG_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_PG_LG_SP_C]

	@LGD_OID					varchar(16)		= NULL,
	@LGD_TID					varchar(20)		= NULL,
	@LGD_MID					varchar(20)		= NULL,
	@LGD_AMOUNT					int				= NULL,
	@LGD_RESPCODE				varchar(10)		= NULL,	
	@LGD_RESPMSG				varchar(200)	= NULL,
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


		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO ORD_PG_LG
		(
			LGD_OID,
			LGD_TID,
			LGD_MID,
			LGD_AMOUNT,
			LGD_RESPCODE,
			LGD_RESPMSG
		)
		VALUES
		(
			@LGD_OID,
			@LGD_TID,
			@LGD_MID,
			@LGD_AMOUNT,
			@LGD_RESPCODE,
			@LGD_RESPMSG
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
	exec [ORD_PG_LG_SP_C] @LGD_OID='ss'
	
	select * from ORD_PG_LG
	
*/



GO
