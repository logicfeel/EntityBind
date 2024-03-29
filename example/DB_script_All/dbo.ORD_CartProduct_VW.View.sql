USE [jns9778]
GO
/****** Object:  View [dbo].[ORD_CartProduct_VW]    Script Date: 2021-11-25 오후 3:58:40 ******/
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

CREATE VIEW [dbo].[ORD_CartProduct_VW] AS

SELECT 
	a.crt_idx, a.client_id, a.meb_idx,
	b.prt_id, b.opt_idx, b.qty_it, b.state_cd, b.create_dt, b.ord_id,
	c.optName, c.discount_mn, c.sell_mn, c.point_it, c.default_yn,
	CASE WHEN c.discount_mn > 0 THEN c.discount_mn ELSE c.sell_mn END AS buy_mn,
	d.sto_id, d.type_cd, d.prtName,
	e.choice_bt, e.default_cd, e.deli_mn, e.method_cd, e.underBase_mn, e.under_mn,
	f.state_cd AS prt_state_cd, f.begin_dt, f.close_dt, f.stock_it
FROM 
	ORD_Cart a, 
	ORD_CartProduct b, 
	PRT_Option c, 
	PRT_Master d, 
	PRT_Delivery e,
	PRT_Info f
WHERE a.crt_idx = b.crt_idx
	and b.del_yn = 'N'
	and	b.prt_id = c.prt_id
	and b.opt_idx = c.opt_idx
	and c.del_yn = 'N'
	and c.prt_id = d.prt_id
	and d.prt_id = e.prt_id
	and d.prt_id = f.prt_id


GO
