USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Delivery_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_Delivery_SP_U]

	@deli_idx					int,						-- PK
	@recipient					nvarchar(10)	= NULL,
	@method_cd					char(3)			= NULL,
	@choice_cd					char(5)			= NULL,
	@zipcode					varchar(7)		= NULL,
	@addr1						nvarchar(50)	= NULL,
	@addr2						nvarchar(50)	= NULL,
	@tel						varchar(15)		= NULL,
	@memo						nvarchar(50)	= NULL,
	@request_dt					smalldatetime	= NULL,
	@send_dt					smalldatetime	= NULL,
	@dco_idx					int				= NULL,				
	@invoice					varchar(20)		= NULL,
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
		IF @deli_idx <= 0 OR @deli_idx IS NULL 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @deli_idx ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM ORD_Delivery WHERE deli_idx = @deli_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_Delivery ', 16, @RESULT);
		END	

		-- 송장 입력시 날짜 등록
		IF  @invoice IS NOT NULL and LEN(@invoice) > 0 and @send_dt IS NULL
		BEGIN
			SET @send_dt = GETDATE()
		END

	/*******************************************************/
		-- 처리 (수정)
		UPDATE ORD_Delivery 
		SET
			recipient = CASE WHEN @recipient IS NULL THEN recipient ELSE @recipient END,
			method_cd = CASE WHEN @method_cd IS NULL THEN method_cd ELSE @method_cd END,
			choice_cd = CASE WHEN @choice_cd IS NULL THEN choice_cd ELSE @choice_cd END,
			zipcode = CASE WHEN @zipcode IS NULL THEN zipcode ELSE @zipcode END,
			addr1 = CASE WHEN @addr1 IS NULL THEN addr1 ELSE @addr1 END,
			addr2 = CASE WHEN @addr2 IS NULL THEN addr2 ELSE @addr2 END,
			tel = CASE WHEN @tel IS NULL THEN tel ELSE @tel END,
			memo = CASE WHEN @memo IS NULL THEN memo ELSE @memo END,
			request_dt = CASE WHEN @request_dt IS NULL THEN request_dt ELSE @request_dt END,
			send_dt = CASE WHEN @send_dt IS NULL THEN send_dt ELSE @send_dt END,
			dco_idx = CASE WHEN @dco_idx IS NULL THEN dco_idx ELSE @dco_idx END,
			invoice = CASE WHEN @invoice IS NULL THEN invoice ELSE @invoice END
		WHERE
			deli_idx = @deli_idx
		
		
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
	exec [ORD_Delivery_SP_U] @deli_idx=5, @recipient='수려인(수정'
	
	select * from ORD_Delivery
	
*/




GO
