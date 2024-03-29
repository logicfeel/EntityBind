USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Option_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Option_SP_U]

	@opt_idx					int,						-- PK
	@prt_id						int,						-- PK
	@optName					nvarchar(30)	= NULL,
	@sell_mn					int				= NULL,
	@discount_mn				int				= NULL,
	@point_it					int				= NULL,			
	@default_yn					char(1)			= NULL,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- DECLARE LOCAL ---- */
	DECLARE @db_sell_mn			int
	DECLARE @db_discount_mn		int


	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION
	
		
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @opt_idx <= 0 OR @opt_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @opt_idx ', 16, @RESULT);
		END		
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END


		-- 조회 (검사)
		SELECT 
			@db_sell_mn = sell_mn, 
			@db_discount_mn = discount_mn
		FROM PRT_Option WHERE prt_id = @prt_id AND opt_idx = @opt_idx
		
		
		-- 검사 (유효값)
		IF @sell_mn IS NOT NULL AND @sell_mn <= 0 
		BEGIN
			SET @RESULT = 211
			RAISERROR ('[오류] 입력값 0 또는 음수(-) : @sell_mn ', 16, @RESULT);
		END
		IF @discount_mn IS NOT NULL AND @discount_mn < 0 
		BEGIN
			SET @RESULT = 212
			RAISERROR ('[오류] 입력값 음수(-) : @discount_mn ', 16, @RESULT);
		END
		IF @point_it IS NOT NULL AND @point_it < 0 
		BEGIN
			SET @RESULT = 213
			RAISERROR ('[오류] 입력값 음수(-) : @point_it ', 16, @RESULT);
		END
		IF  ((@sell_mn > 0) and (@discount_mn > 0 ) and (@sell_mn <= @discount_mn))
			or
			((@sell_mn > 0) and (@discount_mn IS NULL ) and (@sell_mn <= @db_discount_mn))
			or
			((@sell_mn IS NULL) and (@discount_mn > 0 ) and (@db_sell_mn <= @discount_mn))
		BEGIN
			SET @RESULT = 214
			RAISERROR ('[오류] 판매금액 <= 할인금액 ', 16, @RESULT);
		END
		
		
		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_Option WHERE prt_id = @prt_id AND opt_idx = @opt_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Option ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (조건부) : 기존내용의 변경
		IF @default_yn = 'Y'
			EXEC [PRT_Option_SP_FullSet_U] @prt_id = @prt_id, @default_yn = 'N'
			
		-- 처리 (수정)
		UPDATE PRT_Option 
		SET
			optName = CASE WHEN @optName IS NULL THEN optName ELSE @optName END,
			sell_mn = CASE WHEN @sell_mn IS NULL THEN sell_mn ELSE @sell_mn END,
			discount_mn = CASE WHEN @discount_mn IS NULL THEN discount_mn ELSE @discount_mn END,
			point_it = CASE WHEN @point_it IS NULL THEN point_it ELSE @point_it END,
			default_yn = CASE WHEN @default_yn IS NULL THEN default_yn ELSE @default_yn END
		WHERE
			prt_id = @prt_id AND opt_idx = @opt_idx
		
		
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
	exec [PRT_Option_SP_U] 	@prt_id=1, @opt_idx=1, @optName='옵션1(수정)'

	exec [PRT_Option_SP_U] 	@prt_id=1, @opt_idx=1, @default_yn='Y'
	
	exec [PRT_Option_SP_U] 	@prt_id=1, @opt_idx=2, @sell_mn=4000
	
	-- 오류
	exec [PRT_Option_SP_U] 	@prt_id=1, @opt_idx=2, @sell_mn=2000
	exec [PRT_Option_SP_U] 	@prt_id=1, @opt_idx=2, @discount_mn=4000
	
	select * from PRT_Option
	
*/



GO
