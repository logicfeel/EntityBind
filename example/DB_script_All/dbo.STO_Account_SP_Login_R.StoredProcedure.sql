USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[STO_Account_SP_Login_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






-- ============================================= 
-- Author		: 김영호
-- Create date	: 2019-12-20
-- Update date	: 
-- Description	: 
/*

*/
-- =============================================
CREATE PROC [dbo].[STO_Account_SP_Login_R]

	@adm_id						varchar(20),
	@passwd						varchar(20),
	@use_yn						char(1)			= 'Y',		-- Activity (정상상태)
	@xml_yn						char(1)			= 'N',		-- 출력방식
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE LOCAL ---- */
	DECLARE @RESULT				int				= 0;
	
	DECLARE @acc_idx			int				= -1		-- 없을 경수 실패값

	
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@adm_id) <= 0 OR @adm_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @adm_id ', 16, @RESULT);
		END
		
		IF LEN(@passwd) <= 0 OR @passwd IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @passwd ', 16, @RESULT);
		END		


		-- 조회 (키)
		SELECT @acc_idx = a.acc_idx
		FROM STO_Account a, STO_Master b
		WHERE 1 =1
			and a.adm_id = @adm_id
			and a.passwd = @passwd
			and a.del_yn = 'N'
			and (LEN(@use_yn) = 0 or a.use_yn = @use_yn)
			and a.sto_id = b.sto_id
			and b.del_yn = 'N'


		-- 검사 (데이터)
		IF @acc_idx < 0
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : STO_Account ', 16, @RESULT);
		END
				
		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable


		/*******************************************************/
		-- 처리 (조회)
		SELECT a.acc_idx, a.adm_id, a.admName, a.use_yn
		INTO #TempTable
		FROM STO_Account a, STO_Master b
		WHERE 1 =1
			and a.adm_id = @adm_id
			and a.passwd = @passwd
			and a.del_yn = 'N'
			and (LEN(@use_yn) = 0 or a.use_yn = @use_yn)
			and a.sto_id = b.sto_id
			and b.del_yn = 'N'


		
		/*******************************************************/
		-- 결과 (출력)
		IF @xml_yn = 'Y' 
			SELECT * FROM #TempTable
			FOR XML PATH('row'), TYPE
		ELSE
			SELECT * FROM #TempTable
		
		SET @RESULT = @acc_idx
		RETURN @RESULT
		
	END TRY
	BEGIN CATCH	/***********************************************/
		/* ----- DECLARE CATCH ---- */
		DECLARE @procName		nvarchar(128)	= OBJECT_NAME(@@PROCID);
        DECLARE @errorState		int				= ERROR_STATE();
        
        /* ----- ERROR PROCESS ---- */
		EXEC [SYS_ErrorLog_SP_C] @procName, @msgPrint_yn, @msgSave_yn;
		RETURN -@errorState;
	END CATCH
	SET NOCOUNT OFF	
END

-- ##############################################################
-- #### TEST AREA
/*
	declare @r int
	exec @r = [STO_Account_SP_Login_R] @adm_id='logicfeel', @passwd='1212'
	select @r	

	declare @r int
	exec @r = [MEB_Account_SP_Check_R] @adm_id='log', @passwd='s'
	select @r	
	
	select * from sto_Account
	select * from sto_master

	
*/



GO
