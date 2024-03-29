USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_Tester]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	- @LOG : | IDX | TASK | LINE | S_YN |
	- @arr_task : '' 이면 전체 실행, '1,2' 1번 2번 실행
	- @detail_yn : Log 세부 내용 SELECT
	- @tempSave_yn : ##Tester_Log 임시테이블에 저장 (전역 | 지역)
*/
-- ==============================================================
CREATE PROC [dbo].[ORD_SP_Tester]

	@arr_task					varchar(100)	= NULL,		-- 테스크 배열
	@detail_yn					char(1)			= 'Y',		-- 상세 조회
	@tmpSave_yn					char(1)			= 'N',		-- 임시테이블 저장
	@dataSelect_yn				char(1)			= 'N',		-- @data Select
	@logPrint_yn				char(1)			= 'Y',		-- @Log 출력
	@init_yn					char(1)			= 'N'		-- 초기화							
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE LOCAL ---- */
	DECLARE @RESULT				int				= 0;		-- SP 결과
	DECLARE @TASK				int				= 0;
	DECLARE @NUM				int				= 0;
	DECLARE @DT					char(1)			= ',';		-- 배열 구분자
	DECLARE @ALL				int				= 0;
	DECLARE @LOG TABLE 
	(
			IDX					int IDENTITY(1,1)
				PRIMARY KEY,								-- PK
			TASK				int,						-- 테스크 번호
			MSG					nvarchar(1000),				-- 메세지
			S_YN				char(1)						-- 구분자 & 결과 (Yes, No, Title)
	);
	
	IF @arr_task = '' SET @TASK = -1						-- '' 공백 입력은 전체 실행

	BEGIN TRY
	/*******************************************************/
	-- 설명
	IF @NUM = 0 and @arr_task IS NULL and @init_yn = 'N' and @tmpSave_yn = 'N'
	BEGIN		
		INSERT INTO @LOG VALUES(@NUM, N' - @task = 1: 장바구니 상품등록 ', 'T')
		
		INSERT INTO @LOG VALUES(@NUM, N' - @task = 2: 장바구니 상품등록 (복수) ', 'T')
		
		INSERT INTO @LOG VALUES(@NUM, N' - @task = 3: 즉시구매 상품등록 (복수) ', 'T')
		
		INSERT INTO @LOG VALUES(@NUM, N' - @task = 90: 정적 테이블 등록 ', 'T')
		INSERT INTO @LOG VALUES(@NUM, N'   + ORD_Bank,  ORD_DeliCorp ', '')
		
		INSERT INTO @LOG VALUES(@NUM, N' - @task = 99: 정적 테이블 삭제 및 초기화 ', 'T')
		INSERT INTO @LOG VALUES(@NUM, N'   + ORD_PG_LG, ORD_Bank,  ORD_DeliCorp ', '')
		
		INSERT INTO @LOG VALUES(@NUM, N' - @init=Y : DB삭제 및 초기화 ', 'T')
		INSERT INTO @LOG VALUES(@NUM, N'   + ORD_Master, ORD_Product, ORD_Delivery,', '')
		INSERT INTO @LOG VALUES(@NUM, N'   + ORD_Cart, ORD_CartProduct, ORD_Pay ', '')
		INSERT INTO @LOG VALUES(@NUM, N'   * 제외 (ORD_PG_LG, ORD_Bank,  ORD_DeliCorp )', '')
		
		INSERT INTO @LOG VALUES(@NUM, N' - @tmpSave_yn=Y : @@전역임시테이블에 저장 ', 'T')
		INSERT INTO @LOG VALUES(@NUM, N'   + 로그 저장 ', '')
		INSERT INTO @LOG VALUES(@NUM, N'   + 데이터 저장 ', '')

	END	

		
	/*******************************************************/
	-- Task : 
	SET @NUM = 1
	IF @TASK < 0 or EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item = @NUM)
	BEGIN		
		INSERT INTO @LOG VALUES(@NUM, N' 장바구니 상품등록 ', 'T')
		INSERT INTO @LOG VALUES(@NUM, N' + 일반상품 등록, client_id=A001, 1개 ', '')
		INSERT INTO @LOG VALUES(@NUM, N'   ORD_CartProduct_SP_C', '')

		
		EXEC [ORD_CartProduct_SP_C] @client_id='A001', @prt_id=1, @opt_idx=1
		
		-- 결과 검사후 에러수 : IF
		-- SET @RESULT = @RESULT + 1		
	END


	/*******************************************************/
	-- Task : 
	SET @NUM = 2
	IF @TASK < 0 or EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item = @NUM)
	BEGIN		
		INSERT INTO @LOG VALUES(@NUM, N' 장바구니 상품등록(2개)', 'T')
		INSERT INTO @LOG VALUES(@NUM, N' + 일반상품 등록, client_id=A001, 2개 ', '')
		INSERT INTO @LOG VALUES(@NUM, N'   ORD_Cart_SP_Prts_C', '')

		EXEC [ORD_Cart_SP_Prts_C] @client_id='A001', @arr_prt_opt_qty='1&1&1|1&2&10'

		-- 결과 검사후 에러수 : IF
		-- SET @RESULT = @RESULT + 1		
	END

	/*******************************************************/
	-- Task : 
	SET @NUM = 3
	IF @TASK < 0 or EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item = @NUM)
	BEGIN		
		INSERT INTO @LOG VALUES(@NUM, N' - @task = 3: 즉시구매 상품등록 (복수) ', 'T')
		INSERT INTO @LOG VALUES(@NUM, N' + 일반상품 등록, client_id=A001, 2개, state_cd=R ', '')
		INSERT INTO @LOG VALUES(@NUM, N'   ORD_Cart_SP_Prts_C', '')

		EXEC [ORD_Cart_SP_Prts_C] @client_id='A001', @arr_prt_opt_qty='1&1&1|1&2&10', @state_cd='R'

		-- 결과 검사후 에러수 : IF
		-- SET @RESULT = @RESULT + 1		
	END
			

	/*******************************************************/
	-- Task : 
	SET @NUM = 90
	IF @TASK < 0 or EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item = @NUM)
	BEGIN
		INSERT INTO @LOG VALUES(@NUM, N' 정적 테이블 삭제 및 초기화', 'T')
	
		DELETE FROM ORD_DeliCorp
		DELETE FROM ORD_Bank
		DELETE FROM ORD_PG_LG
				
		DBCC CHECKIDENT( ORD_DeliCorp , RESEED, 0 )
		DBCC CHECKIDENT( ORD_Bank , RESEED, 0 )
		DBCC CHECKIDENT( ORD_PG_LG , RESEED, 0 )
		-- 결과 검사후 에러수 : IF
		-- SET @RESULT = @RESULT + 1
	END		


	/*******************************************************/
	-- 초기화
	IF @init_yn	= 'Y'
	BEGIN
		DELETE FROM ORD_CartProduct
		DELETE FROM ORD_Cart
		DELETE FROM ORD_Pay
		DELETE FROM ORD_Product
		DELETE FROM ORD_Delivery
		DELETE FROM ORD_Master
		
		DBCC CHECKIDENT( ORD_Delivery , RESEED, 0 )
		DBCC CHECKIDENT( ORD_Cart , RESEED, 0 )
	END


	/*******************************************************/
	-- 결과 저장
	IF @tmpSave_yn	= 'Y'
	BEGIN	
		IF OBJECT_ID('tempdb..##Tester_Log') IS NOT NULL
			DROP TABLE ##Tester_Log
		ELSE
			SELECT * INTO ##Tester_Log FROM @LOG

		IF OBJECT_ID('tempdb..##ORD_CartProduct') IS NOT NULL
			DROP TABLE ##ORD_CartProduct
		ELSE
			SELECT * INTO ##ORD_CartProduct FROM ORD_CartProduct
			
		IF OBJECT_ID('tempdb..##ORD_Cart') IS NOT NULL
			DROP TABLE ##ORD_Cart
		ELSE
			SELECT * INTO ##ORD_Cart FROM ORD_Cart

		IF OBJECT_ID('tempdb..##ORD_Pay') IS NOT NULL
			DROP TABLE ##ORD_Pay
		ELSE
			SELECT * INTO ##ORD_Pay FROM ORD_Pay

		IF OBJECT_ID('tempdb..##ORD_Product') IS NOT NULL
			DROP TABLE ##ORD_Product
		ELSE
			SELECT * INTO ##ORD_Product FROM ORD_Product
		
		IF OBJECT_ID('tempdb..##ORD_Delivery') IS NOT NULL
			DROP TABLE ##ORD_Delivery
		ELSE
			SELECT * INTO ##ORD_Delivery FROM ORD_Delivery
		
		IF OBJECT_ID('tempdb..##ORD_Master') IS NOT NULL
			DROP TABLE ##ORD_Master
		ELSE
			SELECT * INTO ##ORD_Master FROM ORD_Master

		
	END

	/*******************************************************/
	-- 결과 출력
	IF @detail_yn = 'Y'
	BEGIN
		-- 로그 등록
		INSERT INTO @LOG VALUES(@NUM, N'---------------------------------', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from Tester_Log', '')
		INSERT INTO @LOG VALUES(@NUM, N'---------------------------------', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ORD_Master', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ORD_Pay', '')		
		INSERT INTO @LOG VALUES(@NUM, N'select * from ORD_Product', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ORD_Delivery', '')
		INSERT INTO @LOG VALUES(@NUM, N'---------------------------------', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ord_cart ', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ord_cartProduct ', '')
		INSERT INTO @LOG VALUES(@NUM, N'---------------------------------', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ##Tester_Log', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ##ORD_Master', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ##ORD_Pay', '')		
		INSERT INTO @LOG VALUES(@NUM, N'select * from ##ORD_Product', '')
		INSERT INTO @LOG VALUES(@NUM, N'select * from ##ORD_Delivery', '')

		
--		SELECT * FROM @LOG
	END
	ELSE
		
	PRINT 'LOG'		
	/*******************************************************/
	-- 로그 Print
	IF @logPrint_yn = 'Y'
	BEGIN
		DECLARE @log_idx	int	= 0
		DECLARE @log_max	int = 0
		DECLARE @T_TASK		int
		DECLARE @T_MSG		varchar(1000)
		DECLARE @T_S_YN		char(1)

		SELECT @log_max = COUNT(*) FROM @LOG
		WHILE (@log_idx < @log_max)
		BEGIN
			SET @log_idx = @log_idx + 1

			SELECT 
				@T_TASK = TASK, 
				@T_MSG = MSG, 
				@T_S_YN = S_YN
			FROM @LOG WHERE idx = @log_idx	
				and (@detail_yn = 'Y' or Len(S_YN) > 0)

			PRINT  CAST(@T_TASK AS varchar) + ' - ' + @T_S_YN + ' | ' + @T_MSG

			--PRINT CAST(@log_idx AS varchar) + ' | ' + CAST(@T_TASK AS varchar(10)) 
			
		END
	END
	ELSE
	BEGIN
		--SELECT * FROM @LOG WHERE (@detail_yn = 'N' or Len(S_YN) > 0)
		SELECT * FROM @LOG 
	END

	/*******************************************************/
	-- 데이터 SELECT
	IF @dataSelect_yn = 'Y'
	BEGIN
		IF EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item IN (50, 90, 99))
			select * from ORD_Master
		IF EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item IN (50, 90, 99))
			select * from ORD_Pay
		IF EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item IN (50, 90, 99))
			select * from ORD_Product
		IF EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item IN (50, 90, 99))
			select * from ORD_Delivery
		IF EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item IN (1, 2, 3, 90, 99))
			select * from ord_cart
		IF EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@arr_task, @DT) WHERE item IN (1, 2, 3, 90, 99))
			select * from ord_cartProduct
	END
			
	-- 결과 리턴
	RETURN @RESULT

	END TRY
	BEGIN CATCH /***********************************************/
	/* ----- DECLARE CATCH ---- */
	DECLARE @errorMessage	nvarchar(1000)	= ERROR_MESSAGE();
	DECLARE @errorSeverity	int				= ERROR_SEVERITY();
	DECLARE @errorState		int				= ERROR_SEVERITY();
	DECLARE @procName		nvarchar(128)	= OBJECT_NAME(@@PROCID);
    
	SET @errorMessage = @procName +' >> '+ @errorMessage;
	
	--IF @save_yn	= 'Y'
	--BEGIN	
	--	IF OBJECT_ID('tempdb..##Tester_Log') IS NOT NULL
	--		DROP TABLE ##Tester_Log
	--	SELECT * INTO ##Tester_Log FROM @LOG				--전역테이블 저장
	--END
	RAISERROR(@errorMessage, @errorSeverity, @errorState);
	END CATCH
	SET NOCOUNT OFF	
END

-- ##############################################################
-- #### TEST AREA
/*
	-- 메세지
	exec [ORD_SP_Tester]

	-- 메세지 & 출력
	exec [ORD_SP_Tester] @logPrint_yn = 'Y'
	
	exec [ORD_SP_Tester] @logPrint_yn = 'N'
	
	
	
	-- 삭제 및 초기화
	exec [ORD_SP_Tester] @init_yn='Y'
	
	exec [ORD_SP_Tester] @tmpSave_yn='Y'

	exec [ORD_SP_Tester] @arr_task='1', @dataSelect_yn = 'Y'
	
	exec [ORD_SP_Tester] @arr_task='2', @dataSelect_yn = 'Y'
	
	exec [ORD_SP_Tester] @arr_task='3'

	-- 조회
	select * from ord_cart 
	select * from ord_cartProduct 

	select * from ##ORD_Master
	   
	exec [ORD_SP_Tester] @arr_task='1,2'
	exec [ORD_SP_Tester] @arr_task=''
	
	-- 테스터 요약
	exec [ORD_SP_Tester] @detail_yn ='N'
	exec [ORD_SP_Tester] @arr_task='1', @detail_yn ='N'
	exec [ORD_SP_Tester] @arr_task='2', @detail_yn ='N'
	exec [ORD_SP_Tester] @arr_task='1,2', @detail_yn ='N'
	exec [ORD_SP_Tester] @arr_task='', @detail_yn ='N'

	-- 테스트 임시테이블 저장
	exec [ORD_SP_Tester]  @save_yn='Y'
	exec [ORD_SP_Tester] @arr_task='1', @save_yn='Y'
	exec [ORD_SP_Tester] @arr_task='2', @save_yn='Y'
	exec [ORD_SP_Tester] @arr_task='1,2', @save_yn='Y'
	exec [ORD_SP_Tester] @arr_task='', @save_yn='Y'
	
	select * from ##Tester_Log
	
	select * from ORD_Master
	select * from ORD_Pay
	select * from ORD_Product
	select * from ORD_Delivery

*/

GO
