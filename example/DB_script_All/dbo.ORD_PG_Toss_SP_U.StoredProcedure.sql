USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_PG_Toss_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_PG_Toss_SP_U]

	@pg_idx						int				= NULL,
	@ord_id						varchar(14)		= NULL,
	@memo						varchar(50)		= NULL,
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
		IF (LEN(@ord_id) <= 0 or @ord_id IS NULL) and (@pg_idx <= 0 or @pg_idx IS NULL)
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @op_idx, @ord_id 중 하나는 있어야함  ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM ORD_PG_Toss WHERE (@ord_id IS NULL or ord_id = @ord_id) and (@pg_idx IS NULL or pg_idx = @pg_idx))
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_PG_Toss ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정)
		UPDATE ORD_PG_Toss 
		SET
			memo = CASE WHEN @memo IS NULL THEN memo ELSE @memo END,
			update_dt = GETDATE()
		WHERE
			(@ord_id IS NULL or ord_id = @ord_id) and (@pg_idx IS NULL or pg_idx = @pg_idx)
		
		
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
	
	- 오류 체크
	exec [ORD_PG_Toss_SP_U]	@ord_id='20210216172', @pg_idx=20
	exec [ORD_PG_Toss_SP_U]	@pg_idx=20
	exec [ORD_PG_Toss_SP_U]	@ord_id='20210216172018', @memo='a'
	exec [ORD_PG_Toss_SP_U]	@pg_idx=2, @memo='b'
	
	select * from ORD_PG_Toss
	
	select * from ORD_Master
	select * from ORD_Product
	select * from ORD_Delivery
	
	
*/




GO
