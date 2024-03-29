USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MEB_Account_SP_Check_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2020-01-19
-- Update date	: 
-- Description	: 
/*
	- 전달시 "" 공백을 전달하면, LEN(@state_cd)
	state_cd : 대기, 정상, 중지, 탈퇴 상태와 같이 리턴함
*/
-- ==============================================================
CREATE PROC [dbo].[MEB_Account_SP_Check_R]

	@meb_id						varchar(20),
	@passwd						varchar(20),
	@state_cd					char(1)			= 'A',		-- Activity (정상상태)
	@xml_yn						char(1)			= 'N',		-- 출력방식
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE LOCAL ---- */
	DECLARE @RESULT				int				= 0;
	
	DECLARE @meb_idx			int				= -1		-- 없을 경수 실패값

	
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@meb_id) <= 0 OR @meb_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @meb_id ', 16, @RESULT);
		END
		
		IF LEN(@passwd) <= 0 OR @passwd IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @passwd ', 16, @RESULT);
		END		


		-- 조회 (키)
		SELECT @meb_idx = a.meb_idx
		FROM MEB_Account a, MEB_Master b
		WHERE a.meb_id = @meb_id
			and a.passwd = @passwd
			and a.meb_idx = b.meb_idx
			and b.del_yn = 'N'
			and (LEN(@state_cd) = 0 or b.state_cd = @state_cd)

		-- 검사 (데이터)
		IF @meb_idx < 0
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : BOD_Notice ', 16, @RESULT);
		END
				
		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable


		/*******************************************************/
		-- 처리 (조회)
		SELECT a.meb_idx, a.meb_id, b.mebName, b.state_cd
		INTO #TempTable
		FROM MEB_Account a, MEB_Master b
		WHERE a.meb_id = @meb_id
			and a.passwd = @passwd
			and a.meb_idx = b.meb_idx
			and b.del_yn = 'N'
			and (LEN(@state_cd) = 0 or b.state_cd = @state_cd)

		
		/*******************************************************/
		-- 결과 (출력)
		IF @xml_yn = 'Y' 
			SELECT * FROM #TempTable
			FOR XML PATH('row'), TYPE
		ELSE
			SELECT * FROM #TempTable
		
		SET @RESULT = @meb_idx
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
	exec @r = [MEB_Account_SP_Check_R] @meb_id='logicfeel', @passwd='aaaa'
	select @r	

	declare @r int
	exec @r = [MEB_Account_SP_Check_R] @meb_id='log', @passwd='s'
	select @r	
	
	select * from MEB_Account
	select * from MEB_master
	select * from MEB_info
	
*/



GO
