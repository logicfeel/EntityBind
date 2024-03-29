USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Cart_SP_Prts_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







-- ============================================= 
-- Author		: 김영호
-- Create date	: 2019-12-20
-- Update date	: 
-- Description	: 
/*

*/
-- =============================================
CREATE PROC [dbo].[ORD_Cart_SP_Prts_L]

	@crt_idx					int,						-- FK
	@state_cd					char(1),					-- 'P':정상, 'R':주문대기, 'C':주문완료
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
		IF @crt_idx <= 0 OR @crt_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @crt_idx ', 16, @RESULT);
		END
		
		IF LEN(@state_cd) <= 0 OR @state_cd IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @state_cd ', 16, @RESULT);
		END
		
		
		-- 검사 (페이지 크기)  :  0, NULL 일때는 전체 조회
		IF @page_size IS NULL OR @page_size = 0
		BEGIN
			SELECT @page_size = COUNT(*) 
			FROM ORD_CartProduct a, PRT_Option b, PRT_Master c, PRT_Delivery d, PRT_BaseDelivery e
			WHERE a.crt_idx = @crt_idx and a.state_cd = @state_cd
				and a.prt_id = b.prt_id	and a.opt_idx = b.opt_idx and b.prt_id = c.prt_id
				and a.prt_id = d.prt_id and c.sto_id = e.sto_id
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
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.create_dt DESC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.create_dt ASC)
				END row_count,
				a.*, b.optName, c.prtName, b.sell_mn, b.discount_mn, b.point_it
				, (select top(1) aa.fileName from PRT_Image aa where aa.prt_id =a.prt_id order by aa.rank_it, aa.img_idx asc) as fileName
				, d.method_cd
				, case d.method_cd
					WHEN 'BASE' THEN e.deli_mn
					WHEN 'FREE' THEN 0 
					ELSE d.deli_mn
				END deli_mn
				, e.base_mn, e.base_cd
			FROM ORD_CartProduct a, PRT_Option b, PRT_Master c, PRT_Delivery d, PRT_BaseDelivery e
			WHERE 
				a.crt_idx = @crt_idx and a.state_cd = @state_cd
				and a.prt_id = b.prt_id and a.opt_idx = b.opt_idx and b.prt_id = c.prt_id 
				and a.prt_id = d.prt_id and c.sto_id = e.sto_id
				and (@keyword IS NULL or c.prtName like '%' + @keyword + '%')	-- 검색조건]
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
	exec [ORD_Cart_SP_Prts_L] @crt_idx=4, @state_cd='P'
	
	exec [ORD_Cart_SP_Prts_L] @crt_idx=20, @state_cd='R', @page_size=0
		
	exec [ORD_Cart_SP_Prts_L] @crt_idx=20, @state_cd='R'
	
	select * from PRT_Image
	
*/





GO
