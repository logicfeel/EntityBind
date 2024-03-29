USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Delivery_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_Delivery_SP_C]

	@ord_id						varchar(14),
	@sto_id						varchar(6),
	@recipient					nvarchar(10),
	@choice_cd					char(5),
	@method_cd					char(3)			= '',	
	@state_cd					char(2)			= '',
	@base_mn					int				= 0,
	@zipcode					varchar(7)		= '',
	@addr1						nvarchar(50)	= '',
	@addr2						nvarchar(50)	= '',
	@tel						varchar(15)		= '',
	@memo						nvarchar(50)	= '',
	@request_dt					smalldatetime	= NULL,
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
		IF LEN(@ord_id) <= 0 OR @ord_id IS NULL 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @ord_id ', 16, @RESULT);
		END
		IF LEN(@sto_id) <= 0 OR @sto_id IS NULL 
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @sto_id ', 16, @RESULT);
		END
		IF LEN(@recipient) <= 0 OR @recipient IS NULL 
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @recipient ', 16, @RESULT);
		END
		IF LEN(@choice_cd) <= 0 OR @choice_cd IS NULL 
		BEGIN
			SET @RESULT = 104
			RAISERROR ('[오류] 필수값 없음 : @choice_cd ', 16, @RESULT);
		END

		-- 검사 (상점)
		IF NOT EXISTS (SELECT * FROM STO_Master WHERE sto_id = @sto_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : STO_Master ', 16, @RESULT);
		END
		

		-- 검사 (유효성)
		IF LEN(@state_cd) > 0 and NOT EXISTS(SELECT * FROM ORD_TF_State('D') WHERE state_cd = @state_cd)
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 유효성 : @state_cd ', 16, @RESULT);
		END	
				

		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO ORD_Delivery
		(
			ord_id,
			sto_id,
			recipient,
			state_cd,
			method_cd,
			choice_cd,
			base_mn,
			zipcode,
			addr1,
			addr2,
			tel,
			memo,
			request_dt
		)
		VALUES
		(
			@ord_id,
			@sto_id,
			@recipient,
			@state_cd,
			@method_cd,
			@choice_cd,
			@base_mn,
			@zipcode,
			@addr1,
			@addr2,
			@tel,
			@memo,
			@request_dt
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
	exec [ORD_Delivery_SP_C] @ord_id='20200108170346', @sto_id='S00001',
		@recipient='수령인1', @state_cd='DI', @method_cd='DIR', @choice_cd='00100'

	exec [ORD_Delivery_SP_C] @ord_id='20200108165100', @sto_id='S00001',
		@recipient='수령인(s=)', @method_cd='DIR', @choice_cd='00100'
	
-- 오류 : 필수 없음
	exec [ORD_Delivery_SP_C] @ord_id='20200108170346', @sto_id='S00001',
		@recipient='수령인1', @state_cd='DI', @method_cd='DIR'

-- 오류 : 상점없음
	exec [ORD_Delivery_SP_C] @ord_id='20200108170346', @sto_id='V00001',
		@recipient='수령인1', @state_cd='DI', @method_cd='DIR', @choice_cd='00100'

	
	select * from ORD_Delivery
	
	select * from ORD_Master
	
*/



GO
