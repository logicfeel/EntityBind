USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[POT_MebPoint_SP_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
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

*/
-- ==============================================================
CREATE PROC [dbo].[POT_MebPoint_SP_L]

	@minus_yn					char(1)			= NULL,		-- 마이너스 여부
	@pot_id						int				= NULL,		-- 마이너스 여부
	@keyword					nvarchar(100)	= NULL,		-- 검색조건
	@page_size					int				= 10,		-- 페이지 크기(전체)
	@page_count					int				= 1,		-- 페이지 번호
	@sort_cd					int				= NULL,		-- 정렬방식
	@row_total					int				= 0 OUTPUT,	-- 페이지 출력
	@xml_yn						char(1)			= 'N',		-- 출력방식	
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장	
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE LOCAL ---- */
	DECLARE @RESULT				int				= 0;


	BEGIN TRY
		/*******************************************************/
		-- 검사 (페이지 크기)  :  0, NULL 일때는 전체 조회
		IF @page_size IS NULL OR @page_size = 0
		BEGIN
			SELECT @page_size = COUNT(*) 
			FROM POT_MebPoint a
			WHERE 1 =1
				and (@keyword IS NULL or (
					a.caption like '%' + @keyword + '%' or 
					a.ord_id like '%' + @keyword + '%'
				))	-- 검색조건
				and (@minus_yn IS NULL or a.minus_yn = @minus_yn)				-- 마이너스 여부
				and (@pot_id IS NULL or a.pot_id = @pot_id)						-- 포인트 코드
		END	


		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable

		
		/*******************************************************/
		-- 처리 (조회)
		;WITH CTE_page AS
		(
			SELECT 
				CASE @sort_cd													-- 정렬방식
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.mp_idx ASC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.mp_idx DESC)
				END row_count,
				a.*,
				(select mebName from MEB_Master aa where aa.meb_idx = a.meb_idx) as mebName
			FROM POT_MebPoint a
			WHERE 1 =1
				and (@keyword IS NULL or (
					a.caption like '%' + @keyword + '%' or 
					a.ord_id like '%' + @keyword + '%'
				))	-- 검색조건
				and (@minus_yn IS NULL or a.minus_yn = @minus_yn)				-- 마이너스 여부
				and (@pot_id IS NULL or a.pot_id = @pot_id)						-- 포인트 코드
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
	exec [POT_MebPoint_SP_L] @keyword='20210408120228'
	exec [POT_MebPoint_SP_L] @sort_cd=1	
	exec [POT_MebPoint_SP_L] @page_size=0
	exec [POT_MebPoint_SP_L] @page_size=0, @minus_yn='N'
	exec [POT_MebPoint_SP_L] @page_size=0, @minus_yn='N'
	exec [POT_MebPoint_SP_L] @page_size=0, @pot_id=2

	
	select * from POT_MebPoint
	
*/



GO
