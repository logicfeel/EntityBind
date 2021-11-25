USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_All_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2020-01-20
-- Update date	: 
-- Description	: 
/*
	검색조건 : 주문상태, 
*/
-- ==============================================================
CREATE PROC [dbo].[ORD_SP_All_L]

	@pay_method					varchar(5)		= NULL,	-- 결제방식(최대 5가지 상태)
	@state_cd					char(2)			= NULL,		-- 주문 상태 : 전체, 대기, 완료, 취소요청, 취소대기, 취소
	@keyword					nvarchar(100)	= NULL,		-- 검색조건 : 주문자, 연락처
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

	DECLARE @delimiter			char(2)			= '||';
	
	DECLARE @ord_state_cd		char(2)			= NULL;
	DECLARE @pay_state_cd		char(2)			= NULL;
	
	
	BEGIN TRY
		/*******************************************************/
		
		IF @state_cd IN ('OW', 'OC', 'OF', 'CR', 'CW', 'CT')
		BEGIN
			SET @ord_state_cd = @state_cd
		END 
		ELSE IF @state_cd IN ('PC', 'PW', 'PF', 'RW', 'RF')
		BEGIN
			SET @pay_state_cd = @state_cd
		END 
		
		
		--IF @state_cd = 
		
		
		-- 검사 (페이지 크기)  :  0, NULL 일때는 전체 조회
		IF @page_size IS NULL OR @page_size = 0
		BEGIN
			SELECT @page_size = COUNT(*) 
			FROM ORD_Master a, ORD_Pay b
			WHERE 1 =1
				and a.del_yn = 'N'
				and a.ord_id = b.ord_id
				and Rtrim(a.state_cd) != '' and Rtrim(b.state_cd) != ''
				and (@ord_state_cd IS NULL or a.state_cd = @ord_state_cd)
				and (@pay_state_cd IS NULL or b.state_cd = @pay_state_cd)
				and (@pay_method IS NULL or CHARINDEX(b.method_cd, @pay_method) > 0)
				and (@keyword IS NULL or (
						a.orderName like '%'+ @keyword + '%'		-- 주문자
						or a.orderTel like '%'+ @keyword + '%'		-- 주문연락처
						)
					)
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
					WHEN 1 THEN ROW_NUMBER() OVER(ORDER BY a.ord_id ASC)
					ELSE ROW_NUMBER() OVER(ORDER BY a.ord_id DESC)
				END row_count
				, a.ord_id, a.create_dt, a.email, a.meb_idx, a.memo, a.orderName, a.orderTel, a.order_mn 
				, (select info from ORD_TF_State_Info(a.state_cd)) as ord_state
				, a.state_cd as ord_state_cd
				, (select info from ORD_TF_State_Info(b.state_cd)) as pay_state
				, b.state_cd as pay_state_cd
				, b.usePoint_it, b.method_cd as pay_method_cd
				, STUFF((
					select 
						+ @delimiter + ' '
						+ cast(bb.prtName as varchar)  
						+ '(' + cast(cc.optName as varchar) + ')'
						+ ' ' + cast(aa.qty_it as varchar) + 'EA '
					from ORD_Product aa, PRT_Master bb, PRT_Option cc 
					where 1=1
						and aa.ord_id = a.ord_id and aa.del_yn = 'N' 
						and aa.prt_id = bb.prt_id
						and aa.prt_id = cc.prt_id and aa.op_idx = cc.opt_idx
					for XML PATH('')
				), 1, 2, '') as prt_info
				, STUFF((
					select 
						@delimiter
						+ cast(aa.recipient as varchar) + ' '
						--+ '[' + aa.state_cd + ']'
						+ '[' + (select info from ORD_TF_State_Info(aa.state_cd ) as info) + ']'
					from ORD_Delivery aa
					where aa.ord_id = a.ord_id and aa.del_yn = 'N' 
					for XML PATH('')
				), 1, 2, '') as deli_info
			FROM ORD_Master a, ORD_Pay b
			WHERE 1 =1
				and a.del_yn = 'N'
				and a.ord_id = b.ord_id
				and Rtrim(a.state_cd) != '' and Rtrim(b.state_cd) != ''
				and (@ord_state_cd IS NULL or a.state_cd = @ord_state_cd)
				and (@pay_state_cd IS NULL or b.state_cd = @pay_state_cd)
				and (@pay_method IS NULL or  CHARINDEX(b.method_cd, @pay_method) > 0)
				and (@keyword IS NULL or (
						a.orderName like '%'+ @keyword + '%'		-- 주문자
						or a.orderTel like '%'+ @keyword + '%'		-- 주문연락처
						)
					)
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
	exec [ORD_SP_All_L]	
	exec [ORD_SP_All_L]	@page_size=0, @pay_method = ''
	exec [ORD_SP_All_L]	@page_size=0, @state_cd='PW'
	exec [ORD_SP_All_L]	@page_size=0, @pay_method = 'P'
	
	select * from ORD_Master
	select * from ORD_Master
	
	select CHARINDEX('A', 'AB')
	select CHARINDEX('B', 'AB')
	select CHARINDEX('C', 'AB')
*/





GO
