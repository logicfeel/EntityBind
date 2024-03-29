USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Cart_SP_Prts_D]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_Cart_SP_Prts_D]

	@crt_idx					int,
	@arr_prt_opt_qty			varchar(8000),
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
	DECLARE @ROW_DELIMITER		char(1)			= '|';
	DECLARE @COL_DELIMITER		char(1)			= '&';
		

	/* ----- DECLARE LOCAL ---- */
	DECLARE @crt_cnt			int				= 0
	DECLARE @idx				int				= 0

	DECLARE @tmp_prt_id			int				= 0
	DECLARE @tmp_opt_idx		int				= 0
	DECLARE @tmp_qty_it			tinyint			= 0

	DECLARE @CartProductKey TABLE (
			idx					int IDENTITY(1,1),			-- PK
			crt_idx				int,
			prt_id				int,
			opt_idx				int,
			qty_it				tinyint
	)
	
	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION
	
		
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @crt_idx <= 0 or @crt_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @crt_idx ', 16, @RESULT);
		END	
		IF LEN(@arr_prt_opt_qty) <= 0 or @arr_prt_opt_qty IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @arr_prt_opt_qty ', 16, @RESULT);
		END			

		
		-- 검사 (값)
		IF @crt_idx <= 0 OR @crt_idx IS NULL 
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @crt_idx ', 16, @RESULT);				
		END				

		-- 임시테이블 등록
		INSERT INTO @CartProductKey (crt_idx, prt_id, opt_idx, qty_it)
		SELECT @crt_idx, CAST(a.item1 AS int), CAST(a.item2 AS int), CAST(a.item3 AS int)
		FROM SYS_TF_Str_To_RowColumn(@arr_prt_opt_qty, @ROW_DELIMITER, @COL_DELIMITER) a

		SET @crt_cnt = @@IDENTITY

		/*******************************************************/
		-- 처리 (반복문)
		WHILE (@idx < @crt_cnt)
		BEGIN
			SET @idx = @idx + 1

			-- 임시키값 설정
			SELECT 
				@tmp_prt_id = prt_id, 
				@tmp_opt_idx = opt_idx, 
				@tmp_qty_it = qty_it
			FROM @CartProductKey WHERE idx = @idx			

			
			-- 처리 (삭제) 
			EXEC [ORD_CartProduct_SP_D]  
					@crt_idx = @crt_idx, 
					@prt_id = @tmp_prt_id, 
					@opt_idx = @tmp_opt_idx
		END

		
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
	exec [STO_Base_SP_C]	99		
	
	select 0
	
*/



GO
