USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[STO_SP_Tester]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[STO_SP_Tester]

	@task_arr					varchar(100)	= NULL,		-- 테스크 배열
	@init_yn					char(1)			= 'N',		-- 종료전 초기화							
	@detail_yn					char(1)			= 'Y',		-- 상세 조회
	@save_yn					char(1)			= 'N'		-- 임시테이블 저장

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
			S_YN				char(1)						-- 구분자 (Yes, No, Title)
	);
	
	IF @task_arr = '' SET @TASK = -1						-- '' 공백 입력은 전체 실행

	BEGIN TRY
	/*******************************************************/
	-- 설명
	IF @NUM = 0 and @task_arr IS NULL
	BEGIN		
		INSERT INTO @LOG VALUES(@NUM, N'@task = 1 : 상점등록 테스트 ', '')
		INSERT INTO @LOG VALUES(@NUM, N'@task = 2: Delete 테스트 ', '')
	END	

		
	/*******************************************************/
	-- Task : 
	SET @NUM = 1
	IF @TASK < 0 or EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@task_arr, @DT) WHERE item = @NUM)
	BEGIN		
		DECLARE @sto_id			varchar(6)
		DECLARE @stoName		nvarchar(100)
		DECLARE @sto_code		char(1)
		
		SET @stoName	= '상점(K)'
		SET @sto_code	= 'K'
		
		EXEC [STO_Master_SP_C] 
			@stoName = @sto_id,
			@sto_code = @sto_code, 
			@sto_id = @sto_id OUTPUT
		
		
		IF EXISTS(select * from STO_Master where stoName = @stoName)
			INSERT INTO @LOG VALUES(@NUM, '', 'Y')
		ELSE
			INSERT INTO @LOG VALUES(@NUM, '', 'N')
		

		--IF @init_yn	= 'Y'
		--	delete 
		
		-- 결과 검사후 에러수 : IF
		SET @RESULT = @RESULT + 1		
	END


	/*******************************************************/
	-- Task : 
	SET @NUM = 2
	IF @TASK < 0 or EXISTS(SELECT * FROM SYS_TF_Str_To_Row(@task_arr, @DT) WHERE item = @NUM)
	BEGIN
		INSERT INTO @LOG VALUES(@NUM, N'메모입니다..ss..', 'N')
		INSERT INTO @LOG VALUES(@NUM, N'메모입니다..ss..', '')
		INSERT INTO @LOG VALUES(@NUM, N'메모입니다..ss..', 'Y')
	
		
		-- 결과 검사후 에러수 : IF
		SET @RESULT = @RESULT + 1
	END	


	/*******************************************************/
	-- 결과 출력
	IF @detail_yn = 'Y'
		SELECT * FROM @LOG
	ELSE
		SELECT * FROM @LOG WHERE Len(S_YN) > 0
		
--select 1/0

	-- 결과 저장
	IF @save_yn	= 'Y'
	BEGIN	
		IF OBJECT_ID('tempdb..##Tester_Log') IS NOT NULL
			DROP TABLE ##Tester_Log
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
	exec [STO_SP_Tester] 
	exec [STO_SP_Tester] @task_arr='1'
	
	select * from STO_Master
	
	select * from ##Tester_Log
	
*/
GO
