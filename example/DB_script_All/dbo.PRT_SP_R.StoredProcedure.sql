USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_SP_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_SP_R]

	@prt_id						int,						-- PK
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
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_Master WHERE prt_id = @prt_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Master ', 16, @RESULT);
		END


		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable


		/*******************************************************/
		-- 처리 (조회)
		SELECT 
			a.* 
			, b.brd_idx, b.state_cd, b.keyword, b.recommRange, b.stock_it
			, b.kind_cd, b.begin_dt, b.close_dt, b.contents
			, c.method_cd 
			, case c.method_cd
				WHEN 'BASE' THEN d.deli_mn
				WHEN 'FREE' THEN 0 
				ELSE c.deli_mn
			END deli_mn
			, d.base_mn, d.base_cd
			, case b.state_cd 
					WHEN 'RS' THEN '[예약판매]'
					WHEN 'DS' THEN '[재고없음]'
					ELSE ''
			END state_info
			--, c.choice_bt, c.default_cd, c.deli_mn, c.under_mn, c.underBase_mn
			, (select aa.sell_mn from PRT_Option aa where aa.prt_id =a.prt_id and aa.default_yn = 'Y' and aa.del_yn = 'N' ) as sell_mn
			, (select aa.discount_mn from PRT_Option aa where aa.prt_id =a.prt_id and aa.default_yn = 'Y' and aa.del_yn = 'N') as discount_mn
			, (select aa.point_it from PRT_Option aa where aa.prt_id =a.prt_id and aa.default_yn = 'Y' and aa.del_yn = 'N') as point_it
			, (select aa.optName from PRT_Option aa where aa.prt_id =a.prt_id and aa.default_yn = 'Y' and aa.del_yn = 'N') as optName
			, (select top(1) aa.fileName from PRT_Image aa where aa.prt_id =a.prt_id order by aa.rank_it, aa.img_idx asc) as fileName
		INTO #TempTable
		FROM PRT_Master a, PRT_Info b, PRT_Delivery c, PRT_BaseDelivery d
		WHERE 1 =1
			and a.prt_id = @prt_id
			and a.prt_id = b.prt_id
			and a.prt_id = c.prt_id
			and a.sto_id = d.sto_id
		
		/*******************************************************/
		-- 결과 (출력)
		IF @xml_yn = 'Y' 
			SELECT * FROM #TempTable
			FOR XML PATH('row'), TYPE
		ELSE
			SELECT * FROM #TempTable
		
		
		RETURN @RESULT
		
	END TRY
	BEGIN CATCH	/***********************************************/
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
	exec [PRT_SP_R] @prt_id=1
	exec [PRT_SP_R] @prt_id=58
	
	select * from PRT_Master
	select * from PRT_Info
	select * from PRT_Image where prt_id=48
	select * from PRT_Delivery
	
*/




GO
