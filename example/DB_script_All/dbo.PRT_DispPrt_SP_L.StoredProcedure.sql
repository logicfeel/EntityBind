USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_DispPrt_SP_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	- TODO:: 이후 하위 트리의 내용도 조회 가능하게 기능추가
	- 하위검색 추가 및 중복 제거 추가
*/
-- ==============================================================
CREATE PROC [dbo].[PRT_DispPrt_SP_L]

	@dsp_id						int,						-- FK
	@sub_yn						char(1)			= 'N',
	@hide_yn					char(1)			= 'Y',
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
		-- 검사 (필수값)
		IF @dsp_id <= 0 OR @dsp_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @dsp_id ', 16, @RESULT);
		END
		
				
		-- 검사 (페이지 크기)  :  0, NULL 일때는 전체 조회
		IF @page_size IS NULL OR @page_size = 0
		BEGIN
			SELECT @page_size = COUNT(*) 
			FROM PRT_DispPrt a, PRT_Master b, PRT_Info c, PRT_Option d, PRT_Display_TF_Sub(@dsp_id, @sub_yn) e
			WHERE 1 =1
				and e.dsp_id = a.dsp_id
--				and a.dsp_id = @dsp_id 
				and a.prt_id = b.prt_id 
				
				and (@hide_yn = 'N' or RIGHT(c.state_cd, 1) = 'S')
				and b.del_yn = 'N' and b.prt_id = c.prt_id
				and b.prt_id = d.prt_id and d.del_yn = 'N' and d.default_yn ='Y'
				and (@keyword IS NULL or b.prtName like '%' + @keyword + '%')	-- 검색조건
		END	


		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable

		--SET @sort_cd = 1

		/*******************************************************/
		-- 처리 (조회)
		;WITH CTE_page AS
		(
			SELECT 
				distinct
				CASE @sort_cd
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY f.sum_qty DESC)
					WHEN 2 THEN ROW_NUMBER() OVER(ORDER BY g.sum_grade DESC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.rank_it, b.prtName ASC)			-- 기본 이름순 정렬
				END row_count
				, a.prt_id
				, b.prtName, b.type_cd, c.kind_cd, c.state_cd
				, case c.state_cd 
					WHEN 'RS' THEN '[예약판매]'
					WHEN 'DS' THEN '[재고없음]'
					ELSE ''
				END state_info
				, isnull((select top (1) aa.optName + ' : ' + cast(aa.sell_mn as varchar) + '원' 
						from PRT_Option aa where aa.prt_id = a.prt_id and aa.default_yn = 'Y'), '') as default_opt
				, d.sell_mn, d.discount_mn, d.point_it, d.optName
				, (select top (1) aa.fileName from PRT_Image aa where aa.prt_id = a.prt_id and aa.position_cd ='B' order by aa.rank_it asc) as fileName
				, f.sum_qty, g.sum_grade
				, a.rank_it
			FROM PRT_DispPrt a, PRT_Master b, PRT_Info c, PRT_Option d, PRT_Display_TF_Sub(@dsp_id, @sub_yn) e
				, (	select aa.prt_id, isnull((select sum(aaa.qty_it) from ORD_Product aaa where aaa.prt_id = aa.prt_id), 0) as sum_qty
					FROM PRT_Master aa 
				) f
				, (	select aa.prt_id, isnull((select (sum(cast(aaa.grade_cd as int) * 20)) / count(aaa.grade_cd)  from PRT_Opinion aaa where aaa.prt_id = aa.prt_id), 0) as sum_grade
					FROM PRT_Master aa 
				) g
			WHERE 1 =1 
				and e.dsp_id = a.dsp_id
--				and a.dsp_id = @dsp_id 
				and a.prt_id = b.prt_id 
				--and RIGHT(c.state_cd, 1) = 'S'
				and (@hide_yn = 'N' or RIGHT(c.state_cd, 1) = 'S')
				and b.del_yn = 'N' and b.prt_id = c.prt_id
				and b.prt_id = d.prt_id and d.del_yn = 'N' and d.default_yn ='Y'
				and a.prt_id = f.prt_id and a.prt_id = g.prt_id
				and (@keyword IS NULL or b.prtName like '%' + @keyword + '%')	-- 검색조건
			GROUP BY 
				a.prt_id, f.sum_qty, g.sum_grade, b.prtName, b.type_cd, c.kind_cd, c.state_cd
				, d.sell_mn, d.discount_mn, d.point_it, d.optName, a.rank_it
				
		)
		SELECT *, (SELECT COUNT(*) FROM CTE_page) AS row_total
		INTO #TempTable
		FROM CTE_page
		WHERE row_count between ((@page_count-1) * @page_size)+1 and (@page_count * @page_size)
		ORDER BY rank_it, row_count ASC;

		
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
	exec [PRT_DispPrt_SP_L]	@dsp_id=8
	exec [PRT_DispPrt_SP_L]	@dsp_id=1, @page_size=0
	exec [PRT_DispPrt_SP_L]	@dsp_id=2, @page_size=0
	exec [PRT_DispPrt_SP_L]	@dsp_id=2, @page_size=0, @sub_yn='Y'
	exec [PRT_DispPrt_SP_L]	@dsp_id=8, @hide_yn ='N'
	
	exec [PRT_DispPrt_SP_L]	@dsp_id=7
	exec [PRT_DispPrt_SP_L]	@dsp_id=7, @sort_cd = 1
	exec [PRT_DispPrt_SP_L]	@dsp_id=7, @sort_cd = 2
	
	exec [PRT_DispPrt_SP_L]	@dsp_id=3
	exec [PRT_DispPrt_SP_L]	@dsp_id=1, @page_size=0
	exec [PRT_DispPrt_SP_L]	@dsp_id=3, @page_size=0, @sub_yn='Y'
	
	select * from PRT_DispPrt
	select * from PRT_Master
	select * from PRT_Info c
	
*/



GO
