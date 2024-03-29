USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[BOD_Notice_SP_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	- 멀티 레코드 출력
		+ 상위노출
		+ 목록 : 페이지 정보
	- 전달시 "" 공백을 전달하면, LEN(@state_cd)
	state_cd : 대기, 정상, 중지 상태와 같이 리턴함		
*/
-- ==============================================================
CREATE PROC [dbo].[BOD_Notice_SP_L]

	@state_cd					char(1)			= 'A',		-- Activity (정상상태)
	@division_yn				char(1)			= 'N',		-- 출력 
	@keyword					nvarchar(100)	= NULL,		-- 검색조건
	@page_size					int				= 10,		-- 페이지 크기(전체)
	@page_count					int				= 1,		-- 페이지 번호
	@sort_cd					int				= NULL,		-- 정렬방식
	@top_yn						char(1)			= NULL,		-- 최상위 유무
	@popup_yn					char(1)			= NULL,		-- 팝업 유무
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
			FROM BOD_Notice a
			WHERE a.del_yn = 'N' 
				and (@division_yn = 'N' or a.top_yn = 'N')
				and (LEN(@state_cd) = 0 or a.state_cd = @state_cd)
				and (@top_yn IS NULL or a.top_yn = @top_yn)
				and (@popup_yn IS NULL or a.popup_yn = @popup_yn)

		END	


		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable

		
		/*******************************************************/
		-- 처리 (조회) : 상위 노출 (페이지 없음)
		IF @division_yn = 'Y'
		BEGIN
			SELECT a.*
			INTO #TempTable_Top
			FROM BOD_Notice a
			WHERE a.del_yn = 'N' and a.top_yn = 'Y'
				and (LEN(@state_cd) = 0 or a.state_cd = @state_cd)
				and (@top_yn IS NULL or a.top_yn = @top_yn)
				and (@popup_yn IS NULL or a.popup_yn = @popup_yn)

			ORDER BY a.ntc_idx DESC
		END


		-- 처리 (조회)
		;WITH CTE_page AS
		(
			SELECT 
				CASE @sort_cd													-- 정렬방식
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.ntc_idx ASC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.ntc_idx DESC)
				END row_count,
				a.*
			FROM BOD_Notice a
			WHERE a.del_yn = 'N' 
				and (@division_yn = 'N' or a.top_yn = 'N')
				and (LEN(@state_cd) = 0 or a.state_cd = @state_cd)
				and (@keyword IS NULL or a.title like '%' + @keyword + '%')	-- 검색조건
				and (@top_yn IS NULL or a.top_yn = @top_yn)
				and (@popup_yn IS NULL or a.popup_yn = @popup_yn)
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
		BEGIN
			SELECT * FROM #TempTable
			FOR XML PATH('row'), TYPE
			
			IF @division_yn = 'Y'
				SELECT * FROM #TempTable_Top
				FOR XML PATH('row'), TYPE
		END
		ELSE
		BEGIN
			SELECT * FROM #TempTable
			
			IF @division_yn = 'Y'
				SELECT * FROM #TempTable_Top
		END
		
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
	exec [BOD_Notice_SP_L]
	exec [BOD_Notice_SP_L] @top_yn='N'
	exec [BOD_Notice_SP_L] @popup_yn='N'
	exec [BOD_Notice_SP_L] @state_cd=''
	
	-- 분할
	exec [BOD_Notice_SP_L] @division_yn='Y'
	exec [BOD_Notice_SP_L] @division_yn='Y', @state_cd=''
	
	
	
	exec [BOD_Notice_SP_L] @xml_yn='Y'
	
	select * from BOD_Notice
	
*/

GO
