USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MEB_Account_SP_Overlap_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[MEB_Account_SP_Overlap_R]

	@meb_id						varchar(20),
	@xml_yn						char(1)			= 'N',		-- 출력방식
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@meb_id) <= 0 OR @meb_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @meb_id ', 16, @RESULT);
		END


		/*******************************************************/
		-- 처리 (조회)

		SELECT a.meb_id, a.meb_idx, b.mebName
		INTO #TempTable
		FROM MEB_Account a, MEB_Master b
		WHERE a.meb_id = @meb_id and a.meb_idx = b.meb_idx
		
		--중복됨
		IF EXISTS(SELECT * FROM #TempTable WHERE meb_id = @meb_id)
		BEGIN
			SET @RESULT = -2								
		END
		
		/*******************************************************/
		-- 결과 (출력)
		IF @xml_yn = 'Y' 
			SELECT * FROM #TempTable
			FOR XML PATH('row'), TYPE
		ELSE
			SELECT * FROM #TempTable
		
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
	exec @r = [MEB_Account_SP_Overlap_R] @meb_id='logicfeel33'
	select @r 

	declare @r int
	exec @r = [MEB_Account_SP_Overlap_R] @meb_id='logicfeel'
	select @r 
	
	select * from MEB_Account
	select * from #TempTable
	SELECT * 
		INTO #TempTable
		FROM MEB_Account
		WHERE meb_id = 'logicfeel'
*/
GO
