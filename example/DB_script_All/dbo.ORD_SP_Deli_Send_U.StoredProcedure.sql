USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_Deli_Send_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_SP_Deli_Send_U]

	@deli_idx					int,						-- PK
	@ord_id						varchar(14),
	@dco_idx					int,						
	@invoice					varchar(20)		= NULL,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- DECLARE LOCAL ---- */
	DECLARE @state_cd			char(2)			= 'DS'
	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사
		IF @deli_idx <= 0 or @deli_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @deli_idx ', 16, @RESULT);
		END
		IF LEN(@ord_id) <= 0 or @ord_id IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @ord_id ', 16, @RESULT);
		END

		
		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM ORD_Delivery WHERE deli_idx = @deli_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_Delivery ', 16, @RESULT);
		END
		
		
		-- 검사 (유효성)
		IF NOT EXISTS(SELECT * FROM ORD_TF_Next_State_Check(@ord_id, @state_cd))
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 유효성 검사 : ORD_TF_Next_State_Check ', 16, @RESULT);
		END
		

		/*******************************************************/
		-- 처리 (수정) : SP호출
		EXEC [ORD_Delivery_SP_Status_U] 
				@deli_idx = @deli_idx, 
				@state_cd = @state_cd

		EXEC [ORD_Delivery_SP_U]
				@deli_idx = @deli_idx, 
				@dco_idx = @dco_idx, 
				@invoice = @invoice
		
		/*******************************************************/
		-- 커밋

		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

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
	exec [STO_Base_SP_C]	99		
	
	select 0
	
*/



GO
