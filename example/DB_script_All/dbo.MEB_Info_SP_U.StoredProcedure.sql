USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MEB_Info_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[MEB_Info_SP_U]

	@meb_idx					int,						-- PK
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
		IF @meb_idx <= 0 OR @meb_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @meb_idx ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM MEB_Info WHERE meb_idx = @meb_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : MEB_Info ', 16, @RESULT);
		END	


		-- 검사 (중복)
		IF LEN(@nickname) > 0 AND @nickname IS NOT NULL 
				AND EXISTS(SELECT * FROM MEB_Info WHERE nickname = @nickname and meb_idx <> @meb_idx)
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 중복 : @nickname ', 16, @RESULT);				
		END
		

		/*******************************************************/
		-- 처리 (수정)
		UPDATE MEB_Info 
		SET
			nickname = CASE WHEN @nickname IS NULL THEN nickname ELSE @nickname END,
			email = CASE WHEN @email IS NULL THEN email ELSE @email END,
			zipcode = CASE WHEN @zipcode IS NULL THEN zipcode ELSE @zipcode END,
			addr1 = CASE WHEN @addr1 IS NULL THEN addr1 ELSE @addr1 END,
			addr2 = CASE WHEN @addr2 IS NULL THEN addr2 ELSE @addr2 END,
			tel = CASE WHEN @tel IS NULL THEN tel ELSE @tel END,
			hp = CASE WHEN @hp IS NULL THEN hp ELSE @hp END,
			join_cd = CASE WHEN @join_cd IS NULL THEN join_cd ELSE @join_cd END,
			joinComment = CASE WHEN @joinComment IS NULL THEN joinComment ELSE @joinComment END,
			memo = CASE WHEN @memo IS NULL THEN memo ELSE @memo END,
			update_dt = GETDATE()
		WHERE
			meb_idx = @meb_idx
		
		
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
	exec [MEB_Info_SP_U] @meb_idx=3
	exec [MEB_Info_SP_U] @meb_idx=3, @addr1='주소요'

	exec [MEB_Info_SP_U] @meb_idx=5, @addr1='주소요', @nickname='cc'

-- 오류 : 중복
	exec [MEB_Info_SP_U] @meb_idx=3, @addr1='주소요', @nickname='vv '

	select * from MEB_Info
	
*/



GO
