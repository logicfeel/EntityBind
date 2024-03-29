USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Option_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Option_SP_C]

	@prt_id						int,
	@optName					nvarchar(30),
	@sell_mn					int,
	@discount_mn				int				= 0,
	@point_it					int				= 0,			
	@default_yn					char(1)			= NULL,
	
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력	
	
AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
	
	
	/* ----- DECLARE LOCAL ---- */
	DECLARE @opt_idx			int
	
		
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION

	
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END
		IF LEN(@optName) <= 0 OR @optName IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @optName ', 16, @RESULT);
		END		
		IF @sell_mn IS NULL
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @sell_mn ', 16, @RESULT);
		END
		
		
		-- 검사 (유효값)
		IF @sell_mn <= 0 
		BEGIN
			SET @RESULT = 211
			RAISERROR ('[오류] 입력값 0 또는 음수(-) : @sell_mn ', 16, @RESULT);
		END
		IF @discount_mn < 0 
		BEGIN
			SET @RESULT = 212
			RAISERROR ('[오류] 입력값 음수(-) : @discount_mn ', 16, @RESULT);
		END
		IF @point_it < 0 
		BEGIN
			SET @RESULT = 213
			RAISERROR ('[오류] 입력값 음수(-) : @point_it ', 16, @RESULT);
		END
		IF @sell_mn < @discount_mn
		BEGIN
			SET @RESULT = 214
			RAISERROR ('[오류] 판매금액 < 할인금액 : ', 16, @RESULT);
		END


		-- 설정 (기본값) : Y가 아니고 & 값이 없으면 => Y
		IF @default_yn <> 'Y' AND NOT EXISTS(SELECT * FROM PRT_Option WHERE prt_id = @prt_id)
			SET @default_yn = 'Y'
		ELSE IF @default_yn IS NULL
			SET @default_yn = 'N'

		/*******************************************************/
		-- 처리 (조건부) : 기존내용의 변경
		IF @default_yn = 'Y'
			EXEC [PRT_Option_SP_FullSet_U] @prt_id = @prt_id, @default_yn = 'N'


		-- 처리 (opt_idx 생성)
		SELECT @opt_idx = (ISNULL(MAX(opt_idx), 0) + 1) 
		FROM PRT_Option WHERE prt_id = @prt_id
		
		
		-- 처리 (등록)
		INSERT INTO PRT_Option
		(
			prt_id,
			opt_idx,
			optName,
			sell_mn,
			discount_mn,
			point_it,
			default_yn
		)
		VALUES
		(
			@prt_id,
			@opt_idx,
			@optName,
			@sell_mn,
			@discount_mn,
			@point_it,
			@default_yn
		)

		
		/*******************************************************/
		-- 결과 (커밋 및 리턴)
		/* ----- TRANSACTION ------ */
		IF @TranCounter = 0
			COMMIT TRANSACTION
					
		SET @RESULT = @opt_idx
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

	exec [PRT_Option_SP_C] @prt_id=1, @optName = '옵션3', @sell_mn=1000
	exec [PRT_Option_SP_C] @prt_id=1, @optName = '옵션3', @sell_mn=1000, @default_yn='Y'

	-- 판매가 오류
	exec [PRT_Option_SP_C] @prt_id=1, @optName = '옵션1', @sell_mn=0

	-- 할인가격 큼 오류
	exec [PRT_Option_SP_C] @prt_id=1, @optName = '옵션1', @sell_mn=1000, @discount_mn=2000

	-- 입력값 음수 오류
	exec [PRT_Option_SP_C] @prt_id=1, @optName = '옵션1', @sell_mn=1000, @point_it = -20

	select * from PRT_Option
		
*/



GO
