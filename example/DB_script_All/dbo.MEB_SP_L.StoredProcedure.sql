USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MEB_SP_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2019-01-19
-- Update date	: 
-- Description	: 
/*

*/
-- ==============================================================
CREATE PROC [dbo].[MEB_SP_L]

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
			FROM MEB_Master a, MEB_Info b, MEB_Account c
			WHERE a.meb_idx = b.meb_idx and a.meb_idx = c.meb_idx
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
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.create_dt ASC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.create_dt DESC)
				END row_count,
				a.*, 
				b.zipcode, b.addr1, b.addr2, b.hp, b.join_cd, b.joinComment, 
				b.memo, b.nickname, b.tel, b.update_dt AS info_update_dt,
				c.meb_id, c.passwd, c.update_dt AS account_update_dt
				, ISNULL((select aa.total_it from POT_Member aa where aa.meb_idx = a.meb_idx), 0) as total_it
			FROM MEB_Master a, MEB_Info b, MEB_Account c
			WHERE a.del_yn = 'N' 
				and  a.meb_idx = b.meb_idx and a.meb_idx = c.meb_idx
				and (@keyword IS NULL or a.mebName like '%' + @keyword + '%')	-- 검색조건
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
	exec [MEB_SP_L]	
	exec [MEB_SP_L]	@page_size=0
	
	select * from Meb_master
	select * from Meb_info
	select * from Meb_account
	
*/




GO
