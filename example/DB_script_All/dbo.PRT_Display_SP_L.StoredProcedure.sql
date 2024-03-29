USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Display_SP_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2020-01-18
-- Update date	: 
-- Description	: 
/*

*/
-- ==============================================================
CREATE PROC [dbo].[PRT_Display_SP_L]

	@dsp_id						int				= NULL,		-- 지정할 경우 하위 트리 목록
--	@keyword					nvarchar(100)	= NULL,		-- 검색조건
--	@sort_cd					int				= NULL,		-- 정렬방식
	@delimiter					char(1)			= ',',		-- 트리이름 구분자
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
		-- 조회 (키) : 최상위 첫번째 dsp_id
		IF @dsp_id IS NULL
		BEGIN
			SELECT TOP (1) @dsp_id = dsp_id 
			FROM PRT_Display a where a.parent_id = 0 and a.del_yn = 'N'
			ORDER BY dsp_id ASC
		END
		
		
		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable

		
		/*******************************************************/
		-- 처리 (조회)
		--;WITH CTE_page AS
		--(
		--	SELECT 
		--		CASE @sort_cd													-- 정렬방식
		--			WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.dspName ASC)
		--			ELSE ROW_NUMBER() OVER(ORDER BY a.dsp_id ASC)
		--		END row_count,
		--		a.*
		--	FROM PRT_Display a
		--	WHERE 
		--		a.parent_id = @parent_id
		--		and (@keyword IS NULL or a.dspName like '%' + @keyword + '%')	-- 검색조건
		--)
		--SELECT *, (SELECT COUNT(*) FROM CTE_page) AS row_total
		--INTO #TempTable
		--FROM CTE_page
		--ORDER BY row_count ASC;


		;WITH CTE_tree(dsp_id, parent_id, lvl) AS
		(
				SELECT dsp_id, parent_id, 1 AS lvl
				FROM PRT_Display
				WHERE dsp_id = @dsp_id
			UNION ALL
				SELECT c.dsp_id, c.parent_id, lvl + 1
				FROM PRT_Display c, CTE_tree cte
				WHERE c.parent_id = cte.dsp_id and c.del_yn = 'N'
		)
		, CTE_nav(dsp_id, parent_id, depth, dspNames) AS
		(
				SELECT dsp_id, parent_id, 1 AS depth, dspName
				FROM PRT_Display
--				WHERE dsp_id = @dsp_id
			UNION ALL
				SELECT c.dsp_id, c.parent_id, depth + 1, cte.dspNames
				FROM PRT_Display c, CTE_nav cte
				WHERE 1 =1
					and c.del_yn = 'N'
					and c.parent_id = cte.dsp_id 
		)
--		SELECT * FROM CTE_nav
		SELECT 
			a.*
			, (SELECT COUNT(*) FROM CTE_tree) AS row_total
--			, c.dspNames

			,	STUFF((select @delimiter + aa.dspNames from CTE_nav aa
					where aa.dsp_id = a.dsp_id
					order by aa.depth desc
					for XML PATH('')
				), 1, 1, '') as dspNames

		INTO #TempTable
		FROM PRT_Display a, CTE_tree b
		WHERE 1 =1
			and a.dsp_id = b.dsp_id
--			and a.dsp_id = c.dsp_id
		
		ORDER BY a.rank_it, a.dsp_id;
--		ORDER BY a.rank_it, a.dsp_id, a.dspName;
		
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
	exec [PRT_Display_SP_L] 
	exec [PRT_Display_SP_L] @delimiter = '>'
	
	exec [PRT_Display_SP_L] @dsp_id=1
	exec [PRT_Display_SP_L] @dsp_id=2
	exec [PRT_Display_SP_L] @dsp_id=3
	
	select * from PRT_Display
	
	TODO:: 프론트 구현시 테스트
	
*/



GO
