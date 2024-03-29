USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_State_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
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

*/
-- ==============================================================
CREATE PROC [dbo].[ORD_SP_State_R]

	@meb_idx					int				= NULL,		-- 회원
	@ord_id						varchar(14)		= '',		-- 비회원 1
	@orderTel					varchar(15)		= '',		-- 비회원 2
	@orderName					nvarchar(10)	= '',		-- 비회원 2
	
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
		IF @meb_idx IS NULL and @ord_id IS NULL and (@orderTel IS NULL or @orderName IS NULL)
		BEGIN
			SET @RESULT = 11
			RAISERROR ('[오류] 필수값 없음 : @meb_idx or @ord_id, @tel, @orderName  ', 16, @RESULT);
		END

		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable

		/*******************************************************/
		-- 처리 (조회)
		;WITH CTE AS
		(
			SELECT ord_id
			FROM ORD_Master a
			WHERE 1 = 1
				and a.del_yn = 'N'
				--and (@meb_idx IS NULL or (a.meb_idx = @meb_idx))
				and (@meb_idx IS NULL or a.meb_idx = @meb_idx)
				and (LEN(@ord_id) = 0 or (a.ord_id = @ord_id))
				and (LEN(@orderTel) = 0 and LEN(@orderName) = 0
					or (a.orderTel = @orderTel and a.orderName = @orderName )
				)
		)
		SELECT 
			distinct
			(select COUNT(*) from ORD_Pay aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'PW'
			) as state_PW
			, (select COUNT(*) from ORD_Pay aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'PC'
			) as state_PC
			, (select COUNT(*) from ORD_Pay aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'RW'
			) as state_RW
			, (select COUNT(*) from ORD_Pay aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'RF'
			) as state_RF
			, (select COUNT(*) from ORD_Pay aa, ORD_Delivery bb
				where aa.ord_id = bb.ord_id and bb.del_yn ='N' and bb.state_cd ='DW' and aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'PF'
			) as state_PF
			, (select COUNT(*) from ORD_Pay aa, ORD_Delivery bb, ORD_Master cc where aa.ord_id = bb.ord_id and bb.del_yn ='N' and bb.state_cd ='DW' and aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'PF'
					and aa.ord_id = cc.ord_id and cc.state_cd = 'OF'
			) as state_DW
			, (select COUNT(*) from ORD_Delivery aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'DK'
			) as state_DK
			, (select COUNT(*) from ORD_Delivery aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'DR'
			) as state_DR
			, (select COUNT(*) from ORD_Delivery aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'DS'
			) as state_DS
			, (select COUNT(*) from ORD_Delivery aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'DF'
			) as state_DF
			, (select COUNT(*) from ORD_Delivery aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'TW'
			) as state_TW			
			, (select COUNT(*) from ORD_Delivery aa where aa.ord_id IN (select cte.ord_id from CTE) and aa.state_cd = 'TF'
			) as state_TF
			, (select COUNT(*) from ORD_Pay aa, ORD_PG_Toss bb where aa.ord_id IN (select cte.ord_id from CTE) and aa.ord_id = bb.ord_id and aa.state_cd IN ('', 'PW')
			) as state_Err
		INTO #TempTable
		
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
	exec [ORD_SP_State_R] @ord_id='20210208160444'
	exec [ORD_SP_State_R] @meb_idx=1 
	exec [ORD_SP_State_R] @orderName='주문자2', @orderTel=''
	exec [ORD_SP_State_R] 
	
	exec [ORD_SP_State_R] @meb_idx=1, @orderName='주문자2', @orderTel=''
	exec [ORD_SP_State_R] @meb_idx=1, @orderName='', @orderTel='', @ord_id =''
	
	select * from ORD_Master
	
*/

GO
