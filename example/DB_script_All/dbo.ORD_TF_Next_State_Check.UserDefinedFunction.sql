USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[ORD_TF_Next_State_Check]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2020-01-14
-- Update date	: 
-- Description	: 
/*
	- 결제상태
		+ 결제대기 : PW (*초기값)
		+ 결제취소 : PC
		+ 결제완료 : PF
		+ 환불대기 : RW
		+ 환불완료 : RF

	- 주문상태
		+ 주문대기 : OW (*초기값)
		+ 주문취소 : OC
		+ 주문완료 : OF
		+ 취소요청 : CR
		+ 취소대기 : CW
		+ 취소대기(판품처리) : CT

	- 배송상태
		+ 배송대기 : DW (*초기값)
		+ 배송취소 : DC
		+ 배송확인 : DK
		+ 배송준비 : DR
		+ 배송발송 : DS
		+ 배송완료 : DF
		+ 반품대기 : TW
		+ 반품완료 : TF
*/
-- ==============================================================
CREATE FUNCTION [dbo].[ORD_TF_Next_State_Check]
(
	@ord_id						varchar(14),
	@state_cd					char(2)
)
RETURNS 
@Table_TF TABLE 
(
	success_yn					char(1)
)
AS
BEGIN
	/* ----- DECLARE LOCAL ---- */
	DECLARE @P_state_cd			char(2)
	DECLARE @O_state_cd			char(2)
	DECLARE @D_state_cd			char(2)

	/*******************************************************/
	-- 조회
	SELECT 
		@P_state_cd =c.state_cd,
		@O_state_cd = a.state_cd,
		@D_state_cd = b.state_cd
	FROM 
		ORD_Master a, 
		ORD_Delivery b, 
		ORD_Pay c
	WHERE a.ord_id = b.ord_id
		and a.del_yn = 'N'
		and b.del_yn = 'N'
		and	a.ord_id = c.ord_id
		and a.ord_id = @ord_id

	/*******************************************************/
	-- 결과 (검사)
	IF EXISTS(SELECT * FROM ORD_TF_State_Check(@P_state_cd, @O_state_cd, @D_state_cd)
					WHERE state_cd = @state_cd)
	BEGIN
		INSERT INTO @Table_TF(success_yn) VALUES('Y') 
	END
	
	RETURN 
END

-- ##############################################################
-- #### TEST AREA
/*
	select * from ORD_TF_Next_State_Check('20210207105029', 'PF')
	
	select * from ORD_TF_Next_State_Check('20210205195857', 'PC')
	
	select * from ORD_TF_Next_State_Check('20200108165204', 'PF')
	select * from ORD_TF_Next_State_Check('20200108165204', 'OC')
	select * from ORD_TF_Next_State_Check('20200108165204', 'DC')


	select * from ORD_TF_Order_State_Check('20200108165204', 'DK')
	select * from ORD_TF_Order_State_Check('20200108165204', 'OR')
	
	SELECT * FROM ORD_TF_State_Check('PW', 'OW', 'DW') 
	
	SELECT * FROM ORD_TF_State_Check('PW', 'OW', 'DW') where state_cd ='DK'

	select * from ORD_Master
	SELECT 
		a.state_cd,
		b.state_cd,
		c.state_cd
	FROM 
		ORD_Master a, 
		ORD_Delivery b, 
		ORD_Pay c
	WHERE a.ord_id = b.ord_id
		and a.del_yn = 'N'
		and b.del_yn = 'N'
		and	a.ord_id = c.ord_id
		and a.ord_id = '20200108165204'
			
*/
GO
