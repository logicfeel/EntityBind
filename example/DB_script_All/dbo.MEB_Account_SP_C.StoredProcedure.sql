USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MEB_Account_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[MEB_Account_SP_C]

	@meb_idx					int,
	@meb_id						varchar(20),
	@passwd						varchar(20),
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
	-- 계정, 비밀번호 최소 글자
	DECLARE @MIN_LIMIT			int				= 5;
		

	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @meb_idx <= 0 OR @meb_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @meb_idx ', 16, @RESULT);
		END
		
		IF LEN(@meb_id) <= 0 OR @meb_id IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @meb_id ', 16, @RESULT);
		END
		IF LEN(@passwd) <= 0 OR @passwd IS NULL
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @passwd ', 16, @RESULT);
		END


		-- 검사 (최소길이)
		IF LEN(@meb_id) < @MIN_LIMIT
		BEGIN
			SET @RESULT = 104
			RAISERROR ('[오류] 최소길이 : @meb_id ', 16, @RESULT);
		END
		
		IF LEN(@passwd) < @MIN_LIMIT
		BEGIN
			SET @RESULT = 105		
			RAISERROR ('[오류] 최소길이 : @passwd ', 16, @RESULT);
		END
		

		-- 검사 (중복)
		IF EXISTS(SELECT * FROM MEB_Account WHERE meb_id = @meb_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 중복 : MEB_Account ', 16, @RESULT);
		END

		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO MEB_Account
		(
			meb_idx,
			meb_id,
			passwd
		)
		VALUES
		(
			@meb_idx,
			@meb_id,
			@passwd
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
exec [MEB_Account_SP_C]	@meb_idx=1, @meb_id='abcd', @passwd='aaaa'
exec [MEB_Account_SP_C]	@meb_idx=2, @meb_id='abcd1', @passwd='aaaa'

select * from MEB_account
	
*/



GO
