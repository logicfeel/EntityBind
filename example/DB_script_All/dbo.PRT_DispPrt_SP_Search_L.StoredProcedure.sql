USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_DispPrt_SP_Search_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
*/
-- ==============================================================
CREATE PROC [dbo].[PRT_DispPrt_SP_Search_L]

	@keyword					nvarchar(100)	= NULL,		-- 검색조건
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
	/* ----- DECLARE LOCAL ---- */
	DECLARE @RESULT				int				= 0;


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
/*
		IF @dsp_id <= 0 OR @dsp_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @dsp_id ', 16, @RESULT);
		END
*/		
				
		-- 검사 (페이지 크기)  :  0, NULL 일때는 전체 조회
		IF @page_size IS NULL OR @page_size = 0
		BEGIN
			SELECT @page_size = COUNT(*) 
			FROM PRT_Master a, PRT_Info b, PRT_Option c
			WHERE 1 = 1
				and a.del_yn = 'N' 
				and a.prt_id IN (select aa.prt_id from PRT_DispPrt aa where aa.prt_id = a.prt_id)			
				and a.prt_id = b.prt_id 
				and a.prt_id = c.prt_id and c.del_yn = 'N' and c.default_yn = 'Y'
				and (@keyword IS NULL or a.prtName like '%' + @keyword + '%')	-- 검색조건
		END	


		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable

		
		/*******************************************************/
		-- 처리 (조회)
		;WITH CTE_page AS
		(
			SELECT 
				distinct
				CASE @sort_cd													-- 정렬방식
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.prtName ASC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.prtName DESC)
				END row_count
				, a.prt_id, a.prtName, a.type_cd, b.kind_cd, b.state_cd
				, case b.state_cd 
					WHEN 'RS' THEN '[예약판매]'
					WHEN 'DS' THEN '[재고없음]'
					ELSE ''
				END state_info
				, isnull((select top (1) aa.optName + ' : ' + cast(aa.sell_mn as varchar) + '원' 
					from PRT_Option aa where aa.prt_id = a.prt_id and aa.default_yn = 'Y'), '') as default_opt
				, c.sell_mn, c.discount_mn, c.point_it, c.optName
				, (select top (1) aa.fileName from PRT_Image aa where aa.prt_id = a.prt_id and aa.position_cd ='B' order by aa.rank_it asc) as fileName
			FROM PRT_Master a, PRT_Info b, PRT_Option c
			WHERE 1 = 1
				and a.del_yn = 'N' 
				and a.prt_id IN (select aa.prt_id from PRT_DispPrt aa where aa.prt_id = a.prt_id)			
				and a.prt_id = b.prt_id 
				and RIGHT(b.state_cd, 1) = 'S'
				and a.prt_id = c.prt_id and c.del_yn = 'N' and c.default_yn = 'Y'
				and (@keyword IS NULL or a.prtName like '%' + @keyword + '%')	-- 검색조건
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
	exec [PRT_DispPrt_SP_Search_L]
	
	select * from PRT_DispPrt
	select * from PRT_Master
	select * from PRT_Info c
	
*/




GO
