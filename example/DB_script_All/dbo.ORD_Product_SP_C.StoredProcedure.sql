USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Product_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_Product_SP_C]

	@ord_id						varchar(14),
	@prt_id						int,
	@opt_idx					int,
	@buy_mn						int,
	@deli_idx					int,
	@qty_it						tinyint			= 1,
	@deli_mn					int				= 0,
	@point_it					int				= 0,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;


	/* ----- DECLARE LOCAL ---- */
	DECLARE @sum_mn				int				= 0
	DECLARE @sum_point_it		int				= 0

	DECLARE @op_idx				tinyint
	
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
		IF @prt_id < 0 OR @prt_id IS NULL 
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END
		IF @opt_idx < 0 OR @opt_idx IS NULL 
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @opt_idx ', 16, @RESULT);
		END
		IF @buy_mn <= 0 OR @buy_mn IS NULL 
		BEGIN
			SET @RESULT = 104
			RAISERROR ('[오류] 필수값 없음 : @buy_mn ', 16, @RESULT);
		END
		IF @deli_idx <= 0 OR @deli_idx IS NULL 
		BEGIN
			SET @RESULT = 105
			RAISERROR ('[오류] 필수값 없음 : @deli_idx ', 16, @RESULT);
		END

		-- 검사 (중복)
		IF EXISTS (SELECT * FROM ORD_Product WHERE ord_id = @ord_id 
					AND prt_id = @prt_id AND opt_idx = @opt_idx )
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 중복 : @prt_id, @op_idx ', 16, @RESULT);
		END
		

		/*******************************************************/
		-- 처리 (키생성)
		SELECT @op_idx = (ISNULL(MAX(op_idx), 0) + 1) 
		FROM ORD_Product 
		WHERE ord_id = @ord_id

		-- 처리 (계산)
		SET @sum_mn = @buy_mn * @qty_it

		
		-- 처리 (계산)
		SET @sum_point_it = @point_it * @qty_it

		-- 처리 (등록)
		INSERT INTO ORD_Product
		(
			ord_id,
			op_idx,
			prt_id,
			opt_idx,
			buy_mn,
			qty_it,
			sum_mn,
			point_it,
			deli_mn,
			deli_idx
		)
		VALUES
		(
			@ord_id,
			@op_idx,
			@prt_id,
			@opt_idx,
			@buy_mn,
			@qty_it,
			@sum_mn,
			@sum_point_it,
			@deli_mn,
			@deli_idx
		)
				

		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION
		
		SET @RESULT = @op_idx
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
	exec [ORD_Product_SP_C]	@ord_id='20200108170346', @prt_id=1,
		@opt_idx=1, @buy_mn=5000, @deli_idx=1
	
-- 오류 : 금액
	exec [ORD_Product_SP_C]	@ord_id='20200108170346', @prt_id=1,
		@opt_idx=1, @buy_mn=0, @deli_idx=1

-- 오류 : 배송
	exec [ORD_Product_SP_C]	@ord_id='20200108170346', @prt_id=2,
		@opt_idx=1, @buy_mn=5000, @deli_idx=10


	select * from ORD_Master
	select * from ORD_Product
	select * from ORD_Delivery
	
*/



GO
