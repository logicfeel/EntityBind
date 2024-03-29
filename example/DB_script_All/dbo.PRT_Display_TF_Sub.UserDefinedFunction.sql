USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[PRT_Display_TF_Sub]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[PRT_Display_TF_Sub]
(	
	@dsp_id						int,						-- FK
	@sub_yn						char(1)		= 'N'
)
RETURNS TABLE 
AS
RETURN 
(
	WITH CTE_sub(dsp_id, parent_id, lvl) AS
	(
			SELECT dsp_id, parent_id, 1 AS lvl
			FROM PRT_Display
			WHERE dsp_id = @dsp_id
		UNION ALL
			SELECT c.dsp_id, c.parent_id, lvl + 1
			FROM PRT_Display c, CTE_sub cte
			WHERE c.parent_id = cte.dsp_id and c.del_yn = 'N'
	)
	SELECT distinct a.* 
	FROM PRT_Display a, CTE_sub b 
	WHERE 1 = 1 
		and (
			(@sub_yn = 'N' and a.dsp_id = @dsp_id)
			or 
			(@sub_yn = 'Y' and a.dsp_id = b.dsp_id)
		)

)


-- ##############################################################
-- #### TEST AREA
/*
	select * from [PRT_Display_TF_Sub](1, 'N')
	select * from [PRT_Display_TF_Sub](1, 'Y')
	select * from [PRT_Display_TF_Sub](4, 'N')
	select * from [PRT_Display_TF_Sub](4, 'Y')
	select * from [PRT_Display_TF_Sub](2, 'N')
	select * from [PRT_Display_TF_Sub](2, 'Y')
	
	select * from PRT_DispPrt
	select * from PRT_Master
	select * from PRT_Info c
	
*/
GO
