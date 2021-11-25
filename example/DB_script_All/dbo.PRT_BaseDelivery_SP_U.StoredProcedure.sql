USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_BaseDelivery_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_BaseDelivery_SP_U]

	@sto_id						varchar(6),					-- PK
	
	@deli_mn					int				= NULL,
	@base_mn					int				= NULL,
	@base_cd					char(1)			= NULL,
	
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
		IF LEN(@sto_id) <= 0 OR @sto_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @sto_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_BaseDelivery WHERE sto_id = @sto_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_BaseDelivery ', 16, @RESULT);
		END
				

		/*******************************************************/
		-- 처리 (수정)
		UPDATE PRT_BaseDelivery 
		SET
			deli_mn = CASE WHEN @deli_mn IS NULL THEN deli_mn ELSE @deli_mn END,
			base_mn = CASE WHEN @base_mn IS NULL THEN base_mn ELSE @base_mn END,
			base_cd = CASE WHEN @base_cd IS NULL THEN base_cd ELSE @base_cd END
		WHERE
			 sto_id = @sto_id
		
		
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
	exec [PRT_BaseDelivery_SP_U] @sto_id='S0001'

	select * from PRT_BaseDelivery
	
*/



GO
