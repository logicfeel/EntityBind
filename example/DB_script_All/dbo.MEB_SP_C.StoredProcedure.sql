USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MEB_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[MEB_SP_C]

	@mebName					nvarchar(10),
	@sto_id						varchar(6),
	@state_cd					char(1)			= 'A',

	@meb_id						varchar(20),
	@passwd						varchar(20),

	@nickname					nvarchar(10)	= '',
	@email						varchar(100)	= '',
	@zipcode					varchar(7)		= '',
	@addr1						nvarchar(50)	= '',
	@addr2						nvarchar(50)	= '',
	@tel						varchar(15)		= '',
	@hp							varchar(15)		= '',
	@join_cd					smallint		= NULL,
	@joinComment				nvarchar(20)	= '',

	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;


	/* ----- DECLARE LOCAL ---- */
	DECLARE @meb_idx			int

	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@mebName) <= 0 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @mebName ', 16, @RESULT);
		END
		IF LEN(@sto_id) <= 0 
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @sto_id ', 16, @RESULT);
		END
		IF LEN(@meb_id) <= 0 
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @meb_id ', 16, @RESULT);
		END
		IF LEN(@passwd) <= 0 
		BEGIN
			SET @RESULT = 104
			RAISERROR ('[오류] 필수값 없음 : @passwd ', 16, @RESULT);
		END


		/*******************************************************/
		-- 처리 (등록) : 회원 마스터 등록
		EXEC @meb_idx = [MEB_Master_SP_C] 
				@mebName = @mebName, 
				@sto_id = @sto_id,
				@state_cd = @state_cd

		IF @meb_idx <= 0 OR @meb_idx IS NULL
		BEGIN
			SET @RESULT = 105
			RAISERROR ('[오류] 키 생성 : @meb_idx ', 16, @RESULT);
		END
		
		
		-- 처리 (등록) : 회원 계정 등록
		EXEC [MEB_Account_SP_C] 
				@meb_idx = @meb_idx,
				@meb_id = @meb_id,
				@passwd = @passwd


		-- 처리 (등록) : 회원 세부정보 등록
		EXEC [MEB_Info_SP_C] 
				@meb_idx = @meb_idx,
				@nickname = @nickname,
				@email = @email,
				@zipcode = @zipcode,
				@addr1 = @addr1,
				@addr2 = @addr2,
				@tel = @tel,
				@hp = @hp,
				@join_cd = @join_cd,
				@joinComment = @joinComment

		
		/*******************************************************/
		-- 커밋

		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION
			
		SET @RESULT = @meb_idx					
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
	exec [MEB_SP_C] @mebName='삿갓김', @sto_id='S00001', 
		@meb_id = 'kkkkk', @passwd= 'ppppw'
		
	exec [MEB_SP_C] @mebName='삿갓김2', @sto_id='S00001', 
		@meb_id = 'kkkkk2', @passwd= 'ppppw', @nickname= 'vv'

	-- 닉네임 중복	
	exec [MEB_SP_C] @mebName='삿갓김2', @sto_id='S00001', 
		@meb_id = 'kkkkk3', @passwd= 'ppppw', @nickname= 'vv'	

	-- 상점 오류
	exec [MEB_SP_C] @mebName='삿갓김', @sto_id='S00000', 
		@meb_id = 'kkkkk', @passwd= 'ppppw'


	exec [MEB_SP_C] @mebName='삿갓김', @sto_id='S00001', 
			@meb_id = 'kkkkk5', @passwd= 'ppppw'

	select * from meb_master
	select * from meb_info
	select * from meb_account

*/



GO
