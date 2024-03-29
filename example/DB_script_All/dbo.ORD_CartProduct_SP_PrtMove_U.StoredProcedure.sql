USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_CartProduct_SP_PrtMove_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_CartProduct_SP_PrtMove_U]

	@move_crt_idx				int,
	@client_id					varchar(20),
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- DECLARE LOCAL ---- */
	DECLARE @CartProductKey TABLE (
			idx					int IDENTITY(1,1),			-- PK
			crt_idx				int,
			prt_id				int,
			opt_idx				int,
			qty_it				tinyint
	);
	DECLARE @cartMax			int				= 0
	DECLARE @cartCnt			int				= 0
	DECLARE @tmp_crt_idx		int				= 0
	DECLARE @tmp_prt_id			int				= 0
	DECLARE @tmp_opt_idx		int				= 0
	DECLARE @tmp_qty_it			tinyint			= 0


	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION
	
		
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@client_id) <= 0 or @client_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @client_id ', 16, @RESULT);
		END
		IF @move_crt_idx <= 0 or @move_crt_idx IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @move_crt_idx ', 16, @RESULT);
		END

		
		INSERT INTO @CartProductKey (crt_idx, prt_id, opt_idx, qty_it)
		SELECT b.crt_idx, b.prt_id, b.opt_idx, b.qty_it
		FROM ORD_Cart a, ORD_CartProduct b 
		WHERE a.client_id = @client_id and a.crt_idx = b.crt_idx and b.del_yn = 'N'
		
		SET @cartMax = @@IDENTITY
		/*******************************************************/
		-- 처리 (수정)
		WHILE (@cartCnt < @cartMax)
		BEGIN

			SET @cartCnt = @cartCnt + 1;
			
			SELECT 
				@tmp_crt_idx = crt_idx, 
				@tmp_prt_id = prt_id, 
				@tmp_opt_idx = opt_idx,
				@tmp_qty_it = qty_it
			FROM @CartProductKey WHERE idx = @cartCnt
			
			
			-- 값을 없을 경우 : 키 변경
			IF NOT EXISTS(SELECT * FROM ORD_CartProduct	WHERE crt_idx = @move_crt_idx
					and prt_id = @tmp_prt_id and opt_idx = @tmp_opt_idx)
			BEGIN
				-- 키 변경 
				EXEC [ORD_CartProduct_SP_U]
						@crt_idx = @tmp_crt_idx, 
						@prt_id = @tmp_prt_id, 
						@opt_idx = @tmp_opt_idx,
						@edit_crt_idx = @move_crt_idx				
			END
			-- 값이 있을 경우 : 수량 수정
			ELSE
			BEGIN
				-- 기존 상품 수량 번경 ** 삭제된 상품은 복구
				EXEC [ORD_CartProduct_SP_U]
						@crt_idx = @tmp_crt_idx, 
						@prt_id = @tmp_prt_id, 
						@opt_idx = @tmp_opt_idx, 
						@qty_it = @tmp_qty_it,
						@del_yn = 'N'
						
				-- 조회 상품 삭제
				EXEC [ORD_CartProduct_SP_D]
						@crt_idx = @tmp_crt_idx, 
						@prt_id = @tmp_prt_id, 
						@opt_idx = @tmp_opt_idx				
			END
			
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
	exec [ORD_CartProduct_SP_PrtMove_U]	@move_crt_idx=2, @client_id= 'CC1'		
	
	select * from ord_cart
	select * from ord_cartproduct
	
*/




GO
