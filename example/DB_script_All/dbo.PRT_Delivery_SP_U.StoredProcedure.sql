USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Delivery_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Delivery_SP_U]

	@prt_id						int	,
	@method_cd					char(4)			= NULL,		 
	@default_cd					char(3)			= NULL,
	@choice_bt					char(5)			= NULL,
	@deli_mn					int				= NULL,
	@under_mn					int				= NULL,
	@underBase_mn				int				= NULL,
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
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_Delivery WHERE prt_id = @prt_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Delivery ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정)
		UPDATE PRT_Delivery 
		SET
			method_cd = CASE WHEN @method_cd IS NULL THEN method_cd ELSE @method_cd END,
			default_cd = CASE WHEN @default_cd IS NULL THEN default_cd ELSE @default_cd END,
			choice_bt = CASE WHEN @choice_bt IS NULL THEN choice_bt ELSE @choice_bt END,
			deli_mn = CASE WHEN @deli_mn IS NULL THEN deli_mn ELSE @deli_mn END,
			under_mn = CASE WHEN @under_mn IS NULL THEN under_mn ELSE @under_mn END,
			underBase_mn = CASE WHEN @underBase_mn IS NULL THEN underBase_mn ELSE @underBase_mn END
		WHERE
			prt_id = @prt_id
		
		
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
	exec [PRT_Delivery_SP_U] @prt_id=1
	exec [PRT_Delivery_SP_U] @prt_id=1, @deli_mn=3000
	
	select * from PRT_Delivery
	
*/



GO
