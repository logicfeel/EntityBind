USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MEB_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	- Info, Account 없으면 생성, 있으면 수정
*/
-- ==============================================================
CREATE PROC [dbo].[MEB_SP_U]

	@meb_idx					int,						-- PK
	@mebName					nvarchar(10)	= NULL,
	@state_cd					char(1)			= NULL,

	@meb_id						varchar(20)		= NULL,
	@passwd						varchar(20)		= NULL,

	@nickname					nvarchar(10)	= NULL,
	@email						varchar(100)	= NULL,
	@zipcode					varchar(7)		= NULL,
	@addr1						nvarchar(50)	= NULL,
	@addr2						nvarchar(50)	= NULL,
	@tel						varchar(15)		= NULL,
	@hp							varchar(15)		= NULL,
	@join_cd					smallint		= NULL,
	@joinComment				nvarchar(20)	= NULL,
	@memo						nvarchar(200)	= NULL,

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
		-- 검사
		IF @meb_idx <= 0 OR @meb_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @meb_idx ', 16, @RESULT);
		END

		
		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM MEB_Master WHERE meb_idx = @meb_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : MEB_Master ', 16, @RESULT);
		END
		

		/*******************************************************/
		-- 처리 (수정) : SP호출
		EXEC [MEB_Master_SP_U]  
				@meb_idx = @meb_idx,
				@mebName = @mebName, 
				@state_cd = @state_cd

		
		---- 처리 (등록/수정) : SP호출
		IF EXISTS(SELECT * FROM MEB_Info WHERE meb_idx = @meb_idx)
		BEGIN
			EXEC [MEB_Info_SP_U]   
				@meb_idx = @meb_idx,
				@nickname = @nickname,
				@email = @email,
				@zipcode = @zipcode,
				@addr1 = @addr1,
				@addr2 = @addr2,
				@tel = @tel,
				@hp = @hp,
				@join_cd = @join_cd,
				@joinComment = @joinComment,
				@memo = @memo

		END	
		ELSE
		BEGIN
			-- **sp호출시 파라메터를 지정하면, SP 기본값은 무시되어 기본값 재설정 **
			-- 기본값 설정
			IF @nickname IS NULL SET @nickname = ''
			IF @zipcode IS NULL SET @zipcode = ''
			IF @addr1 IS NULL SET @addr1 = ''
			IF @addr2 IS NULL SET @addr2 = ''
			IF @tel IS NULL SET @tel = ''
			IF @hp IS NULL SET @hp = ''
			IF @join_cd IS NULL SET @join_cd = ''
			IF @joinComment IS NULL SET @joinComment = ''
			
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
		END
		
				
		-- 처리 (등록/수정) : SP호출
		IF EXISTS(SELECT * FROM MEB_Account WHERE meb_idx = @meb_idx)
		BEGIN
			EXEC [MEB_Account_SP_U]
				@meb_idx = @meb_idx,
				@meb_id = @meb_id,
				@passwd = @passwd
		END
		ELSE				
		BEGIN
			-- ** sp호출시 파라메터를 지정하면, SP 기본값은 무시되어 기본값 재설정 **
			-- 기본값 설정 
			EXEC [MEB_Account_SP_C]
					@meb_idx = @meb_idx,
					@meb_id = @meb_id,
					@passwd = @passwd
		END
		
		
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
	exec [MEB_SP_U] @meb_idx=10, @mebName='사갓(수정).'	
	exec [MEB_SP_U] @meb_idx=10, @mebName='사갓(수정).d', @addr1='aaa'
	exec [MEB_SP_U] @meb_idx=10, @meb_id='kkkk6'
	
	-- 오류 : 중복
	exec [MEB_SP_U] @meb_idx=10, @mebName='사갓(수정).d', @nickname='cc'

	select * from meb_master
	select * from meb_info
	select * from meb_account

*/


GO
