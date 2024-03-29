USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Info_SP_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Info_SP_L]

	@keyword					nvarchar(100)	= NULL,		-- 검색조건
	@page_size					int				= 10,		-- 페이지 크기(전체)
	@page_count					int				= 1,		-- 페이지 번호
	@sort_cd					int				= NULL,		-- 정렬방식
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
		-- 검사 (페이지 크기)  :  0, NULL 일때는 전체 조회
		IF @page_size IS NULL OR @page_size = 0
		BEGIN
			SELECT @page_size = COUNT(*) 
			FROM PRT_Info a, PRT_Master b
			WHERE a.prt_id = b.prt_id 
			and b.del_yn = 'N'
		END	

		
		/*******************************************************/
		-- 처리 (조회)
		;WITH CTE_page AS
		(
			SELECT 
				CASE @sort_cd													-- 정렬방식
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.prt_id ASC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.prt_id DESC)
				END row_count,
				a.*
			FROM PRT_Info a, PRT_Master b
			WHERE 
				a.prt_id = b.prt_id and b.del_yn = 'N'
				and (@keyword IS NULL or a.keyword like '%' + @keyword + '%')	-- 검색조건
		)
		SELECT *, (SELECT COUNT(*) FROM CTE_page) AS row_total
		INTO #TempTable
		FROM CTE_page
		WHERE row_count between ((@page_count-1) * @page_size)+1 and (@page_count * @page_size)
		ORDER BY row_count ASC;

		
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
	EXEC [PRT_Info_SP_L] @page_size = 5, @page_count = 1	-- 1페이지
	EXEC [PRT_Info_SP_L] @page_count = 2, @page_size = 5	-- 2페이지 (위치바꿈)
	EXEC [PRT_Info_SP_L] @page_size = 0				-- 전체 
	EXEC [PRT_Info_SP_L] @xml_yn = 'Y'					-- xml 출력
	EXEC [PRT_Info_SP_L] @keyword = 'b'					-- 검색 조건

	EXEC [PRT_Info_SP_L] ''

	select * from PRT_Info	

	select @@LANGUAGE

*/
GO
