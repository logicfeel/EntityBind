USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Pay_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_Pay_SP_C]

	@ord_id						varchar(14),
	@pay_mn						int,
	@method_cd					char(1),
	@usePoint_it				int				= 0,
	@depositor					nvarchar(10)	= '',
	@bak_idx					int				= NULL,
	@state_cd					char(2)			= '',
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
		IF @pay_mn <= 0 OR @pay_mn IS NULL 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @pay_mn ', 16, @RESULT);
		END
		IF LEN(@method_cd) <= 0 OR @method_cd IS NULL 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @method_cd ', 16, @RESULT);
		END


		-- 검사 (유효성)
		IF LEN(@state_cd) > 0 and NOT EXISTS(SELECT * FROM ORD_TF_State('P') WHERE state_cd = @state_cd)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 유효성 : @state_cd ', 16, @RESULT);
		END	
		
		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO ORD_Pay
		(
			ord_id,
			pay_mn,
			method_cd,
			state_cd,
			usePoint_it,
			depositor,
			bak_idx
		)
		VALUES
		(
			@ord_id,
			@pay_mn,
			@method_cd,
			@state_cd,
			@usePoint_it,
			@depositor,
			@bak_idx
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
	exec [ORD_Pay_SP_C]	99		
	
	select 0
	
*/



GO
