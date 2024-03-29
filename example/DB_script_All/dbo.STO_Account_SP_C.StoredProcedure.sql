USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[STO_Account_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[STO_Account_SP_C]

	@sto_id						varchar(6),
	@adm_id						varchar(20),
	@passwd						varchar(20),
	@admName					nvarchar(10),
	@use_yn						char(1)			= 'Y',
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
		-- 검사 (기본값 설정)
		IF @use_yn IS NULL
		BEGIN
			SET @use_yn = 'Y';
		END
		
		-- 검사 (필수값)
		IF LEN(@sto_id) <= 0 
		BEGIN
			SET @RESULT = 11
			RAISERROR ('[오류] 필수값 없음 : @sto_id ', 16, @RESULT);
		END
		IF LEN(@adm_id) <= 0 
		BEGIN
			SET @RESULT = 12
			RAISERROR ('[오류] 필수값 없음 : @adm_id ', 16, @RESULT);
		END
		IF LEN(@passwd) <= 0 
		BEGIN
			SET @RESULT = 13
			RAISERROR ('[오류] 필수값 없음 : @passwd ', 16, @RESULT);
		END
		IF LEN(@admName) <= 0 
		BEGIN
			SET @RESULT = 14
			RAISERROR ('[오류] 필수값 없음 : @admName ', 16, @RESULT);
		END

		-- 검사 (중복)
		IF EXISTS(SELECT * FROM STO_Account WHERE adm_id = @adm_id)
		BEGIN
			SET @RESULT = 21
			RAISERROR ('[오류] 데이터 중복 : STO_Account ', 16, @RESULT);
		END

		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO STO_Account
		(
			sto_id,
			adm_id,
			admName,
			passwd,
			use_yn
		)
		VALUES
		(
			@sto_id,
			@adm_id,
			@admName,
			@passwd,
			@use_yn
		)

		
		/*******************************************************/
		-- 결과 (커밋 및 리턴)
		/* ----- TRANSACTION ------ */
		IF @TranCounter = 0
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
	exec [STO_Account_SP_C]	@sto_id= 'S00001', @adm_id='logicfeel'
		,@passwd= '1212', @admName='로직'
		

	-- 상점없음 오류
	exec [STO_Account_SP_C]	@sto_id= 'Z00001', @adm_id='logicfeel'
		,@passwd= '1212', @admName='로직'	

	-- 계정 중복 오류
	exec [STO_Account_SP_C]	@sto_id= 'S00001', @adm_id='logicfeel'
		,@passwd= '1212', @admName='로직'	

	-- 오류 : 없는 파라메터 호출 		
	exec [STO_Account_SP_C]	@sto_id= 'S00001', @adm_id='logicfeel3'
		,@passwd= '1212', @admName='로직3', @test='aaa'		


	select * from STO_Account
		
*/



GO
