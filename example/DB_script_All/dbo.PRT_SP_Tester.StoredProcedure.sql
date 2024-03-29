USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_SP_Tester]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	- @task_arr : '' 이면 전체 실행, '1,2' 1번 2번 실행
	- @detail_yn : Log 세부 내용 SELECT
	- @tempSave_yn : ##Tester_Log 임시테이블에 저장 (전역 | 지역)
*/
-- ==============================================================
CREATE PROC [dbo].[PRT_SP_Tester]


	@task_arr					varchar(100)	= NULL,		-- 테스크 배열
	@init_yn					char(1)			= 'N',		-- 종료전 초기화							
	@detail_yn					char(1)			= 'Y',		-- 상세 조회
	@tmpSave_yn					char(1)			= 'N'		-- 임시테이블 저장

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
	
	IF @task_arr = '' SET @TASK = -1						-- '' 공백 입력은 전체 실행

	BEGIN TRY
	/*******************************************************/
	-- 설명
	IF @NUM = 0 and @task_arr IS NULL
	BEGIN		
		INSERT INTO @LOG VALUES(@NUM, N' @task = 1: Insert 테스트 ', '')
		
		INSERT INTO @LOG VALUES(@NUM, N' - @task = 90: 정적 테이블 등록 ', '')
		INSERT INTO @LOG VALUES(@NUM, N' - @task = 99: 정적 테이블 삭제 및 초기화 ', '')
		INSERT INTO @LOG VALUES(@NUM, N'   ORD_PG_LG, ORD_Bank,  ORD_DeliCorp ', '')
		
		INSERT INTO @LOG VALUES(@NUM, N' - @init=Y : DB삭제 및 초기화 ', '')
		INSERT INTO @LOG VALUES(@NUM, N'   ORD_Master, ORD_Product, ORD_Delivery,', '')
		INSERT INTO @LOG VALUES(@NUM, N'   ORD_Cart, ORD_CartProduct, ORD_Pay ', '')
		INSERT INTO @LOG VALUES(@NUM, N'   제외 (ORD_PG_LG, ORD_Bank,  ORD_DeliCorp )', '')
	END	

		
	/*******************************************************/
	-- Task : 
	SET @NUM = 1
	IF @TASK < 0 or EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@task_arr, @DT) WHERE item = @NUM)
	BEGIN		
		INSERT INTO @LOG VALUES(@NUM, N' 장바구니 상품등록 ', 'T')
		INSERT INTO @LOG VALUES(@NUM, N'  ', '')
		

		-- 결과 검사후 에러수 : IF
		-- SET @RESULT = @RESULT + 1		
	END

	

	/*******************************************************/
	-- Task : 
	SET @NUM = 90
	IF @TASK < 0 or EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@task_arr, @DT) WHERE item = @NUM)
	BEGIN
		INSERT INTO @LOG VALUES(@NUM, N' 정적 테이블 삭제 및 초기화', 'T')
	
		DELETE FROM ORD_DeliCorp
		DELETE FROM ORD_Bank
		DELETE FROM ORD_PG_LG
				
		-- 결과 검사후 에러수 : IF
		-- SET @RESULT = @RESULT + 1
	END		


	/*******************************************************/
	-- 결과 출력
	IF @detail_yn = 'Y'
		SELECT * FROM @LOG
	ELSE
		SELECT * FROM @LOG WHERE Len(S_YN) > 0
		

	/*******************************************************/
	-- 초기화
	IF @tmpSave_yn	= 'Y'
	BEGIN
		DELETE FROM ORD_CartProduct
		DELETE FROM ORD_Cart
		DELETE FROM ORD_Pay
		DELETE FROM ORD_Product
		DELETE FROM ORD_Delivery
		DELETE FROM ORD_Master
	END


	/*******************************************************/
	-- 결과 저장
	IF @tmpSave_yn	= 'Y'
	BEGIN	
		IF OBJECT_ID('tempdb..##Tester_Log') IS NOT NULL
		BEGIN
			DROP TABLE ##Tester_Log
			DROP TABLE ##ORD_Master
			DROP TABLE ##ORD_Delivery
			DROP TABLE ##ORD_Product
			DROP TABLE ##ORD_
			DROP TABLE ##Tester_Log
		END
		SELECT * INTO ##Tester_Log FROM @LOG				--전역테이블 저장
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
	-- 테스터 초기메세지, 다중선택, 전체
	exec [PRT_SP_Tester]

	
*/
GO
