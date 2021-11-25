USE [jns9778]
GO
/****** Object:  View [dbo].[ORD_State_VW]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2019-01-15
-- Update date	: 
-- Description	: 
/*

*/
-- ==============================================================

CREATE VIEW [dbo].[ORD_State_VW] AS

SELECT 
	a.state_cd AS O_state_cd,
	b.state_cd AS D_state_cd,
	c.state_cd AS P_state_cd,
	a.ord_id
FROM 
	ORD_Master a, 
	ORD_Delivery b, 
	ORD_Pay c
WHERE a.ord_id = b.ord_id
	and a.del_yn = 'N'
	and b.del_yn = 'N'
	and	a.ord_id = c.ord_id




GO
