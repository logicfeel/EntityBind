USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_SP_C]

	-- 주문번호 리턴
	@ord_id						varchar(14)		= '' OUTPUT,
	
	-- 장바구니 idx
	@crt_idx					int,

	-- 주문정보
	@order_mn					int,
	@orderName					nvarchar(10),
	@email						varchar(100)	= '',
	@orderTel					varchar(15)		= '',

	-- 배송정보
	@recipient					nvarchar(10),
	@choice_cd					char(5),
	@zipcode					varchar(7)		= '',
	@addr1						nvarchar(50)	= '',
	@addr2						nvarchar(50)	= '',
	@tel						varchar(15)		= '',
	@memo						nvarchar(50)	= '',
	@request_dt					smalldatetime	= NULL,

	-- 결제정보
	@pay_mn						int,
	@pay_method_cd				char(1),
	@usePoint_it				int				= 0,
	@bak_idx					int				= NULL,
	@depositor					nvarchar(10)	= '',	

	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
	DECLARE @MSG				nvarchar(1000)	= '';

	/* ----- DECLARE LOCAL ---- */
	DECLARE @meb_idx			int				= NULL
	DECLARE @deli_idx			int
	DECLARE @base_mn			int				= 0
	DECLARE @deli_mn			int				= 0
	DECLARE @sto_sum_mn			int				= 0
	DECLARE @total_mn			int				= 0			-- 상품소계 + 개별배송 + 기준배송
	DECLARE @total_it			int				= 0


	-- 장바구니 상점
	DECLARE @CartStoreKey TABLE (
			idx					int IDENTITY(1,1),			-- PK
			sto_id				varchar(6)
	);
	DECLARE @cart_sto_max_idx	int				= 0
	DECLARE @cart_sto_cnt		int				= 0
	DECLARE @tmp_sto_id			varchar(6)

	-- 장바구니 상품 
	DECLARE @CartProductKey TABLE (
			idx					int IDENTITY(1,1),			-- PK
			crt_idx				int,
			prt_id				int,
			opt_idx				int,
			qty_it				tinyint,
			buy_mn				int,
			deli_mn				int,
			point_it			int
	);
	DECLARE @cart_prt_max_idx	int				= 0
	DECLARE @cart_prt_cnt		int				= 0
	DECLARE @tmp_crt_idx		int				= 0
	DECLARE @tmp_prt_id			int				= 0
	DECLARE @tmp_opt_idx		int				= 0
	DECLARE @tmp_qty_it			tinyint			= 0
	DECLARE @tmp_buy_mn			int				= 0
	DECLARE @tmp_deli_mn		int				= 0
	DECLARE @tmp_point_it		int				= 0

	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @crt_idx <= 0 OR @crt_idx IS NULL 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @crt_idx ', 16, @RESULT);
		END
		IF @order_mn <= 0 OR @order_mn IS NULL 
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @order_mn ', 16, @RESULT);
		END		
		IF LEN(@orderName) <= 0 
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @orderName ', 16, @RESULT);
		END
		IF LEN(@recipient) <= 0 
		BEGIN
			SET @RESULT = 104
			RAISERROR ('[오류] 필수값 없음 : @recipient ', 16, @RESULT);
		END
		IF LEN(@choice_cd) <= 0 
		BEGIN
			SET @RESULT = 105
			RAISERROR ('[오류] 필수값 없음 : @choice_cd ', 16, @RESULT);
		END


		-- 검사 (계산)
		IF @order_mn != (@pay_mn + @usePoint_it)
		BEGIN
			SET @RESULT = 106
			RAISERROR ('[오류] 계산값 : @@order_mn = @pay_mn + @usePoint_it ', 16, @RESULT);
		END

		-- 조회 : 회원idx
		SELECT @meb_idx = meb_idx FROM ORD_Cart WHERE crt_idx = @crt_idx

--VW		
		-- 조회 : 상점
		INSERT INTO @CartStoreKey(sto_id)
		SELECT distinct b.sto_id
		FROM ORD_CartProduct a, PRT_Master b
		WHERE a.crt_idx = @crt_idx 
			and a.state_cd = 'R' 
			and a.del_yn = 'N'
			and a.prt_id = b.prt_id 
		
		-- 조회 : 상점수
		SET @cart_sto_cnt = @@ROWCOUNT
		
		-- 조회 : 상점 idx
		SELECT @cart_sto_max_idx = MAX(idx) FROM @CartStoreKey


		-- 조회 (포인트)
		IF @meb_idx > 0
		BEGIN
			SELECT @total_it = a.total_it FROM POT_Member a WHERE meb_idx = @meb_idx
		END

		-- 검사 (포인트 보유 여부)
		IF @usePoint_it > @total_it
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 포인트 초과 : @usePoint_it > @total_it ', 16, @RESULT);
		END
		
		

		/*******************************************************/
		-- 처리 (등록) : 회원 마스터 등록


		EXEC [ORD_Master_SP_C] @ord_id = @ord_id OUTPUT,
				@order_mn = @order_mn, 
				@orderName = @orderName,
				@email = @email,
				@orderTel = @orderTel,
				@meb_idx = @meb_idx

	
		IF LEN(@ord_id) <= 0 OR @ord_id IS NULL
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 키 생성 : @ord_id ', 16, @RESULT);
		END
		

		-- 처리 (등록) : 결제 
		EXEC [ORD_Pay_SP_C] 
				@ord_id = @ord_id,
				@pay_mn = @pay_mn, 
				@method_cd = @pay_method_cd,
				@usePoint_it = @usePoint_it,
				@bak_idx = @bak_idx,
				@depositor = @depositor


		-- 처리 (포인트)
/*
		IF @usePoint_it > 0 
		BEGIN
			EXEC [POT_MebPoint_SP_C] 
					@meb_idx	= @meb_idx, 
					@point_it	= @usePoint_it, 
					@ord_id		= @ord_id,
					@caption	= '주문결제(포인트사용)', 
					@minus_yn	= 'Y'
		END
*/
		-- 처리 : 배송상점
		WHILE (0 < @cart_sto_cnt)
		BEGIN
			-- 조회
			SELECT @tmp_sto_id = sto_id	FROM @CartStoreKey WHERE idx = @cart_sto_max_idx

--VW
			-- 조회 : 상점별 주문합계금액
			SELECT @sto_sum_mn = ISNULL( SUM(
					CASE WHEN c.discount_mn > 0 
						THEN c.discount_mn * b.qty_it 
						ELSE c.sell_mn * b.qty_it END
				), 0)
			FROM PRT_Master a, ORD_CartProduct b,  PRT_Option c
			WHERE a.sto_id = @tmp_sto_id and b.crt_idx = @crt_idx and b.state_cd = 'R'
				and a.prt_id = b.prt_id and b.del_yn = 'N' 
				and b.prt_id = c.prt_id and b.opt_idx = c.opt_idx
			
--VW			
			-- 조회 : 기준배송비 (기준금액 방식)
			/*
			SELECT @base_mn = ISNULL(c.under_mn, 0) FROM ORD_CartProduct a, PRT_Master b, PRT_Delivery c
			WHERE a.crt_idx = @crt_idx and a.prt_id = b.prt_id and b.sto_id = @tmp_sto_id and b.prt_id = c.prt_id 
				and c.method_cd = 'BASE' and c.underBase_mn > 0
				and c.underBase_mn > @sto_sum_mn
			*/
			SELECT @base_mn = ISNULL(d.deli_mn, 0) FROM ORD_CartProduct a, PRT_Master b, PRT_Delivery c, PRT_BaseDelivery d
			WHERE a.crt_idx = @crt_idx and a.prt_id = b.prt_id and b.sto_id = @tmp_sto_id and b.prt_id = c.prt_id 
				and b.sto_id = d.sto_id
				and a.state_cd = 'R' 
				and c.method_cd = 'BASE' and (
					(d.base_cd = 'U' and d.base_mn < @sto_sum_mn) 
					or
					(d.base_cd = 'O' and d.base_mn >= @sto_sum_mn) 
				)


			-- 처리 (등록) : 배송지 등록
			EXEC @deli_idx = [ORD_Delivery_SP_C]
						@ord_id = @ord_id, 
						@sto_id = @tmp_sto_id, 
						@recipient = @recipient, 
						@choice_cd = @choice_cd,
						@base_mn = @base_mn,
						@zipcode = @zipcode,
						@addr1 = @addr1,
						@addr2 = @addr2,
						@tel = @tel,
						@memo = @memo,
						@request_dt = @request_dt

--VW
			-- 조회 : 상품
			INSERT INTO @CartProductKey (crt_idx, prt_id, opt_idx, qty_it, point_it, deli_mn, buy_mn)
			SELECT 
				a.crt_idx, a.prt_id, a.opt_idx, a.qty_it, c.point_it, 
				ISNULL((select deli_mn from PRT_Delivery aa where aa.prt_id = a.prt_id and aa.method_cd = 'EACH'), 0),
				(case when c.discount_mn > 0 then c.discount_mn	else c.sell_mn end)
			FROM ORD_CartProduct a, PRT_Master b, PRT_Option c
			WHERE a.crt_idx = @crt_idx 
				and a.state_cd = 'R' 
				and a.del_yn = 'N'
				and a.prt_id = b.prt_id
				and b.sto_id = @tmp_sto_id 
				and b.del_yn = 'N'
				and a.prt_id = c.prt_id
				and a.opt_idx = c.opt_idx
				and c.del_yn = 'N'
			
			
			-- 조회 : 상점수
			SET @cart_prt_cnt = @@ROWCOUNT
			
			-- 조회 : 상점 idx
			SELECT @cart_prt_max_idx = MAX(idx) FROM @CartProductKey

			WHILE (0 < @cart_prt_cnt)
			BEGIN
				-- 조회
				SELECT 
					@tmp_prt_id = prt_id,
					@tmp_opt_idx = opt_idx,
					@tmp_qty_it = qty_it,
					@tmp_buy_mn = buy_mn,
					@tmp_point_it = point_it,
					@tmp_deli_mn = deli_mn
				FROM @CartProductKey WHERE idx = @cart_prt_max_idx
				
				-- 처리 (등록) : 주문상품 등록
				EXEC [ORD_Product_SP_C] 
						@ord_id = @ord_id, 
						@prt_id = @tmp_prt_id,
						@opt_idx = @tmp_opt_idx,
						@buy_mn = @tmp_buy_mn,
						@deli_idx = @deli_idx,
						@qty_it = @tmp_qty_it,
						@point_it = @tmp_point_it,
						@deli_mn = @tmp_deli_mn

						
				-- 반복문 : idx 및 cnt 감소			
				SET @cart_prt_cnt = @cart_prt_cnt - 1				-- 반복수 감소
				SET @cart_prt_max_idx = @cart_prt_max_idx - 1		-- idx 감소							
			END
						
			
			-- 반복문 : idx 및 cnt 감소			
			SET @cart_sto_cnt = @cart_sto_cnt - 1				-- 반복수 감소
			SET @cart_sto_max_idx = @cart_sto_max_idx - 1		-- idx 감소
		END					
		

		/*******************************************************/
		-- 등록값 검사
		
		-- 조회 : @total_mn
		--SELECT @total_mn = ISNULL(a.base_mn, 0)
		SELECT @total_mn = (
			ISNULL(SUM(b.sum_mn), 0) 
			+ ISNULL(SUM(b.deli_mn), 0) 
			+ (select ISNULL(SUM(aa.base_mn), 0) from ORD_Delivery aa where aa.ord_id = a.ord_id and aa.del_yn='N' group by aa.ord_id) 
		)
		FROM ORD_Delivery a, ORD_Product b 
		WHERE a.ord_id = @ord_id and a.del_yn = 'N' and a.deli_idx = b.deli_idx and b.del_yn ='N'
		group by a.ord_id

/*
--디버깅용
declare @msg				varchar(100) = '';
SET @msg = cast(@total_mn as varchar) + ', ' +  cast(@base_mn as varchar)  + ', ' +  cast(@base_mn as varchar)
RAISERROR (@msg, 16, 202);
*/


		-- 검사 : 등록결과
		IF @total_mn != @order_mn
		BEGIN
			SET @RESULT = 202
			SET @MSG = '[오류] 필수값 없음 : @total_mn <> @order_mn' 
				+ ', ' +  cast(@total_mn as varchar)
				+ ', ' +  cast(@order_mn as varchar)
				+ ', ' +  cast(@base_mn as varchar)
				
			RAISERROR (@MSG, 16, @RESULT);
		END

		
		/*******************************************************/
		-- 커밋
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
	exec [ORD_SP_C] 
	
	select 0
	
	TODO:: 시나리오 작성후 검사해야함
	
*/

/*
	exec [ORD_SP_C] @crt_idx=41, @order_mn=88000, @orderName=홍길동&recipient=김삿갓&choice_cd=010000&pay_mn=88000&pay_method_cd=P
	
	20210125202501


	exec [ORD_SP_C] @crt_idx=41, @order_mn=88000, @orderName=N'홍길동'
		,@recipient=N'김삿갓', @choice_cd='010000', @pay_mn=88000, @pay_method_cd='P'

	declare @ord varchar(14)
	exec [ORD_Master_SP_C] @order_mn=200, @orderName='주문자2', @ord_id=@ord OUTPUT
	print @ord
	
	declare @ord_id varchar(14)
		EXEC [ORD_Master_SP_C] @ord_id = @ord_id OUTPUT,
				@order_mn = 13000, 
				@orderName = 'aaa',
				@email = '',
				@orderTel = '',
				@meb_idx = ''
	print @ord_id
	
*/
--commit tran

				
GO
