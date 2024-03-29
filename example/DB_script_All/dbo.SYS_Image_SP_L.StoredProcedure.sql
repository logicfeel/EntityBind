USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[SYS_Image_SP_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[SYS_Image_SP_L]

	@img_idx					int				= NULL,		-- PK
	@position_cd				varchar(10)		= NULL,
	@pos_idx					int				= NULL,
	@pos_id						varchar(20)		= NULL,
	@sub_idx					int				= NULL,

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
		-- 키 조회
		IF @position_cd IS NOT NULL 
		BEGIN
			SELECT top(1)
				@img_idx = a.img_idx
			FROM SYS_ImageFile a 
			WHERE a.img_idx = (select aa.img_idx from SYS_Image aa 
				where 1=1
				and aa.position_cd = @position_cd
				and (@pos_idx IS NULL or aa.pos_idx = @pos_idx)
				and (@pos_id IS NULL or aa.pos_id = @pos_id)
				and (@sub_idx IS NULL or aa.sub_idx = @sub_idx)
			)
		END

		-- 검사 (필수값)
/*
		IF @img_idx <= 0 OR @img_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @img_idx ', 16, @RESULT);
		END
*/

		
		-- 검사 (페이지 크기)  :  0, NULL 일때는 전체 조회
		IF @page_size IS NULL OR @page_size = 0
		BEGIN
			SELECT @page_size = COUNT(*) 
			FROM SYS_ImageFile a
			WHERE a.del_yn = 'N' and img_idx = @img_idx 
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
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.file_idx ASC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.file_idx DESC)
				END row_count,
				a.*, b.position_cd
			FROM SYS_ImageFile a, SYS_Image b
			WHERE 
				a.del_yn = 'N'	and a.img_idx = @img_idx and a.img_idx = b.img_idx
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
	exec [SYS_Image_SP_L] @img_idx=13

	exec [SYS_Image_SP_L] @position_cd='PRT', @pos_idx=1

	exec [SYS_Image_SP_L] @position_cd='Product', @pos_idx=11

	exec [PRT_Option_SP_L] @prt_id=43, @page_size=0
	
	select * from SYS_Image
	select * from SYS_ImageFile where img_idx=26
	

*/


GO
