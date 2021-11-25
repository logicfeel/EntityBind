USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[POT_Member_SP_L]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[POT_Member_SP_L]

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

	SELECT 0

END

-- ###################################################
-- ## 테스트 코드
/*
	exec [STO_Base_SP_C]	99		
	
	select 0
	
*/



GO
