USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Cart_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	client 또는 meb_idx 하나를 입력받아서 
*/
-- ==============================================================
CREATE PROC [dbo].[ORD_Cart_SP_C]

	@client_id					varchar(20)		= NULL,
	@meb_idx					int				= NULL,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;


	/* ----- DECLARE LOCAL ---- */
	DECLARE @crt_idx			int
	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @client_id IS NULL AND (@meb_idx <= 0 OR @meb_idx IS NULL) 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @meb_idx 또는 @client_id ', 16, @RESULT);
		END


		-- 검사 (데이터) : 분리된 모듈[컴포넌트]
		IF @meb_idx > 0 AND @meb_idx IS NOT NULL 
			AND NOT EXISTS(SELECT * FROM MEB_Master WHERE meb_idx = @meb_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : MEB_Master ', 16, @RESULT);				
		END


		-- 조회 (client_id로 cnt_idx 조회) : 회원이 우선순위 높음
		-- 우선순위 1>
		IF @meb_idx > 0 AND @meb_idx IS NOT NULL
		BEGIN
			SELECT @crt_idx = crt_idx 
			FROM ORD_Cart 
			WHERE meb_idx = @meb_idx
			
			SET @client_id = NULL
		END
		-- 우선순위 2>
		ELSE
			SELECT @crt_idx = crt_idx 
			FROM ORD_Cart 
			WHERE client_id = @client_id

	
		/*******************************************************/
		-- 처리 (등록)
		IF @crt_idx IS NULL OR @crt_idx <= 0
		BEGIN
			-- 설정 (초기값) : 둘중 하나만 입력
			IF @meb_idx > 0 
				SET @client_id = NULL


			INSERT INTO ORD_Cart
			(
				client_id,
				meb_idx
			)
			VALUES
			(
				@client_id,
				@meb_idx
			)
			
			SET @crt_idx = @@IDENTITY
		END
				

		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION
		
		SET @RESULT = @crt_idx
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
	declare @rtn int
	@rtn = [ORD_Cart_SP_C] @client_id='247060439'
	select @rtn
	
	[ORD_Cart_SP_C] @meb_idx=1
	[ORD_Cart_SP_C] @meb_idx=1, @client_id='CC1'
	[ORD_Cart_SP_C] @meb_idx=3, @client_id='CC3'
	[ORD_Cart_SP_C] @meb_idx=5, @client_id='CC4'
	
	declare @r int
	exec @r = [ORD_Cart_SP_C] @client_id= 'CC1'
	print @r 
	
	declare @r int
	exec @r = [ORD_Cart_SP_C] @client_id= 'CC2'
	print @r 	
	
	select * from ORD_Cart
	
*/



GO
