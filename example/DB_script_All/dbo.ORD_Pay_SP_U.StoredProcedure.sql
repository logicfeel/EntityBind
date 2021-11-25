USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Pay_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_Pay_SP_U]

	@ord_id						varchar(14),				-- PK
	@method_cd					char(1)			= NULL,
	@depositor					nvarchar(10)	= NULL,	
	@memo						nvarchar(50)	= NULL,
	@bak_idx					int				= NULL,
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


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM ORD_Pay WHERE ord_id = @ord_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_Pay ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정)
		UPDATE ORD_Pay 
		SET
			method_cd = CASE WHEN @method_cd IS NULL THEN method_cd ELSE @method_cd END,
			depositor = CASE WHEN @depositor IS NULL THEN depositor ELSE @depositor END,
			memo = CASE WHEN @memo IS NULL THEN memo ELSE @memo END,
			bak_idx = CASE WHEN @bak_idx IS NULL THEN bak_idx ELSE @bak_idx END
		WHERE
			ord_id = @ord_id
		
		
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
	exec [ORD_Pay_SP_U] @ord_id='20210208135330', @memo='aaap...'
	
	select * from ORD_Pay
	
*/




GO
