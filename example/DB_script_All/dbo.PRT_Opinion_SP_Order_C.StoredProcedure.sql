USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Opinion_SP_Order_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
RESULT  @opi_idx
*/
-- ==============================================================
CREATE PROC [dbo].[PRT_Opinion_SP_Order_C]

	@ord_id						varchar(14),
	@grade_cd					char(1),
	@contents					nvarchar(1000)	= '',
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력	
	
AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
	
	
	/* ----- DECLARE LOCAL ---- */
	DECLARE @opi_idx			int

	-- 장바구니 상점
	DECLARE @EachKey TABLE (
			idx					int IDENTITY(1,1),			-- PK
			prt_id				int
	);
	DECLARE @each_cnt			int				= 0
	DECLARE @tmp_prt_id			int
	DECLARE @idx_cnt			int				= 1
		
		
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
		IF LEN(@grade_cd) <= 0 OR @grade_cd IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @grade_cd ', 16, @RESULT);
		END		
		

		-- 조회 : 상품
		INSERT INTO @EachKey(prt_id)
		SELECT a.prt_id
		FROM ORD_Product a
		WHERE a.del_yn = 'N' and a.ord_id = @ord_id

		-- 조회 : 상품수
		SET @each_cnt = @@ROWCOUNT
		
		/*******************************************************/
		-- 처리
		WHILE (0 < @each_cnt)
		BEGIN
			-- 조회
			SELECT @tmp_prt_id = prt_id	FROM @EachKey WHERE idx = @idx_cnt 

			-- 동일 상품에대한 한줄평 등록
			EXEC [PRT_Opinion_SP_C] 
					@prt_id = @tmp_prt_id,
					@grade_cd = @grade_cd, 
					@ord_id = @ord_id,
					@contents = @contents
--PRINT 	@tmp_prt_id		
			-- 반복문 : idx 및 cnt 감소			
			SET @each_cnt	= @each_cnt - 1				-- 반복수 감소
			SET @idx_cnt	= @idx_cnt + 1
		END
		

		
		/*******************************************************/
		-- 결과 (커밋 및 리턴)
		/* ----- TRANSACTION ------ */
		IF @TranCounter = 0
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
exec [PRT_Opinion_SP_Order_C]	@ord_id='20210209164006', @grade_cd='5', @contents='한우 꽃등심(60한우 꽃등심(60한우 꽃등심(60'

select * from PRT_Opinion
	
*/




GO
