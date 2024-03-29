USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_SP_R]

	@ord_id						varchar(14),				-- PK
	@orderName					nvarchar(10)	= NULL,		-- 비회원 2
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
		IF LEN(@ord_id) <= 0 OR @ord_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @ord_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM ORD_Master WHERE ord_id = @ord_id )
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_Master ', 16, @RESULT);
		END


		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable


		/*******************************************************/
		-- 처리 (조회)
		SELECT 
			a.ord_id, a.state_cd as ord_state_cd, a.orderName, a.email, a.orderTel, a.create_dt, a.meb_idx, a.order_mn,
			b.pay_mn, b.usePoint_it, b.method_cd as pay_method_cd, b.state_cd as pay_state_cd, b.bak_idx, 
			CASE b.method_cd													-- 정렬방식
				WHEN 'P' THEN 'PG결제'
				WHEN 'B' THEN '계좌이체'
				ELSE ''
			END as pay_method,
			(select aa.bankName + ' ' + aa.account + ' '+ aa.depositor from ORD_Bank aa where aa.bak_idx = b.bak_idx) as bak_info,
			c.dco_idx, c.choice_cd, c.method_cd as deli_method_cd, c.state_cd as deli_state_cd, c.recipient, 
			c.zipcode, c.addr1, c.addr2, c.memo, c.invoice, c.send_dt, c.request_dt, c.tel,
			(select sum(aa.deli_mn) from ORD_Product aa where aa.ord_id = a.ord_id) + c.base_mn as deli_mn
		INTO #TempTable
		FROM ORD_Master a, ORD_Pay b, ORD_Delivery c
		WHERE a.ord_id = @ord_id
			and a.ord_id = b.ord_id
			and a.ord_id = c.ord_id
			and (@orderName IS NULL or (a.orderName = @orderName))
		
		
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
	exec [ORD_SP_R] @ord_id='20210326114042', @orderName='333'	
	exec [ORD_SP_R] @ord_id='20210326114042', @orderName='김d영호'

	exec [ORD_SP_R] @ord_id='20210407194049'
	
	select * from ORD_Master
	
	select 0
	
*/




GO
