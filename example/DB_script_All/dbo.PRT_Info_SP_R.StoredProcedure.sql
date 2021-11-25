USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Info_SP_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Info_SP_R]

	@prt_id						int,
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
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END

		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_Info WHERE prt_id = @prt_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Info ', 16, @RESULT);
		END

		-- 임시테이블 삭제


		/*******************************************************/
		-- 처리 (조회)
		SELECT * 
		INTO #TempTable
		FROM PRT_Info
		WHERE prt_id = @prt_id
		
		
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
	EXEC @r = [PRT_Info_SP_R] 1
	print @r
	[PRT_Info_SP_R] 1

	[PRT_Info_SP_R] 1, @xml_yn = 'Y'

	-- 에러 발생
	declare @r int
	EXEC @r = [PRT_Info_SP_R] 99
	print @r	

	select * from SYS_ErrorLog
*/
GO
