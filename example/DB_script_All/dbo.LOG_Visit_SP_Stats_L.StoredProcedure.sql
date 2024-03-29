USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[LOG_Visit_SP_Stats_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[LOG_Visit_SP_Stats_L]

	@start_dt					datetime		= NULL,		-- 검색 시작일
	@end_dt						datetime		= NULL,		-- 검색 종료일
	@page_size					int				= 0,		-- 페이지 크기(전체)
	@page_count					int				= 1,		-- 페이지 번호
	@sort_cd					int				= NULL,		-- 정렬방식
	@row_total					int				= 0 OUTPUT,	-- 페이지 출력
	@xml_yn						char(1)			= 'N',		-- 출력방식	
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장	
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;

	-- 초기값 설정
	IF @start_dt IS NULL SET @start_dt = DATEADD(mm, -1, getdate());	-- 1개월전
	IF @end_dt IS NULL SET @end_dt = GETDATE();


	BEGIN TRY
		/*******************************************************/
		-- 검사 (페이지 크기)  :  0, NULL 일때는 전체 조회
		IF @page_size IS NULL OR @page_size = 0
		BEGIN
			SELECT @page_size = COUNT(*) 
			FROM LOG_Visit a
			WHERE a.create_dt between @start_dt and @end_dt
		END	
		
		/*******************************************************/
		-- 처리 (조회)
		;WITH CTE_page AS
		(
			SELECT 
				CASE @sort_cd		-- 정렬방식
					WHEN 1 THEN ROW_NUMBER() OVER(order by CONVERT(CHAR(10), a.create_dt, 23) desc)
					ELSE ROW_NUMBER() OVER(order by CONVERT(CHAR(10), a.create_dt, 23)  asc)
				END row_count
				, CONVERT(CHAR(10), a.create_dt, 23) as create_dt
				, COUNT(*) as cnt, SUM(a.view_it) as view_it
			FROM LOG_Visit a
			WHERE a.create_dt between @start_dt and @end_dt
			group by CONVERT(CHAR(10), a.create_dt, 23) 
			
		)
		SELECT *, (SELECT COUNT(*) FROM CTE_page) AS row_total
		INTO #TempTable
		FROM CTE_page
		WHERE row_count between ((@page_count-1) * @page_size)+1 and (@page_count * @page_size)
		ORDER BY row_count ASC;

		
		-- 처리 (총갯수)
		IF EXISTS(SELECT * FROM #TempTable)
			SELECT @row_total = row_total FROM #TempTable
		ELSE
			SET @row_total = 0
			
		/*******************************************************/
		-- 결과 (출력)
		IF @xml_yn = 'Y' 
			SELECT * FROM #TempTable
			FOR XML PATH('row'), TYPE
		ELSE
			SELECT * FROM #TempTable
		
		RETURN @RESULT
		
	END TRY
	BEGIN CATCH /***********************************************/
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
	exec [LOG_Visit_SP_L]
	
	select * from log_visit
	
*/




GO
