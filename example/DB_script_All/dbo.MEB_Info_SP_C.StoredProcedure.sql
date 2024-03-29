USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MEB_Info_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[MEB_Info_SP_C]

	@meb_idx					int,
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
		
		
		-- 검사 (중복)
		IF LEN(@nickname) > 0 AND EXISTS(SELECT * FROM MEB_Info WHERE nickname = @nickname)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 중복 : @nickname ', 16, @RESULT);				
		END

		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO MEB_Info
		(
			meb_idx,
			nickname,
			email,
			zipcode,
			addr1,
			addr2,
			tel,
			hp,
			join_cd,
			joinComment
		)
		VALUES
		(
			@meb_idx,
			@nickname,
			@email,
			@zipcode,
			@addr1,
			@addr2,
			@tel,
			@hp,
			@join_cd,
			@joinComment
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
exec [MEB_Info_SP_C]	99		

select * from MEB_Info
	
*/



GO
