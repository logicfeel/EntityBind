USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[PRT_FN_DisplayTree]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- ============================================= 
-- Author		: 김영호
-- Create date	: 2017-08-21
-- Update date	: 
-- Description	: 문자열을 갯수의 문자열로 채움
-- =============================================
CREATE FUNCTION [dbo].[PRT_FN_DisplayTree](@dsp_id int)
	RETURNS nvarchar(1000)
AS
BEGIN
	
	DECLARE @return			char(10)
	--SET NOCOUNT ON

		/*******************************************************/
		-- 검사 (필수값)
			SET @return = 1
	return @return
	
--	SET NOCOUNT OFF		

END

-- ###################################################
-- ## 테스트 코드
/*
	SELECT DB_OBJ_NAME.MnAuth_FN_AuthChk('1')
	SELECT DB_OBJ_NAME.MnAuth_FN_AuthChk('777')
*/


GO
