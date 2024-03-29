USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[ORD_TF_State_Check]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE FUNCTION [dbo].[ORD_TF_State_Check]
(
	@pay_cd						char(2)			= NULL,
	@order_cd					char(2)			= NULL,
	@delivery_cd				char(2)			= ''
)
RETURNS 
@Table_TF TABLE 
(
	idx							int IDENTITY(1,1),
	state_cd					char(2),
	info						nvarchar(10)
)
AS
BEGIN
	/*******************************************************/
	-- 검사 값 범위 검사
	IF @pay_cd NOT IN ('PC', 'PW', 'PF', 'RW', 'RF')
		or @order_cd NOT IN ('OW', 'OC', 'OF', 'CR', 'CW', 'CT')
		or @delivery_cd NOT IN ('DW', 'DK', 'DR', 'DS', 'DF', 'TW', 'TF', 'DC', '')
	BEGIN
		INSERT INTO @Table_TF(state_cd, info) VALUES('', '범위오류')
	END

	
	/*******************************************************/
	-- 결제상태 검사
	IF (@pay_cd IN ('PW', '') and @order_cd IN ('OW', 'OC', '') and @delivery_cd IN ('DW', 'DC', ''))
		INSERT INTO @Table_TF(state_cd, info) VALUES('PC', '결제취소')
	
	IF (@pay_cd IN ('PW') and @order_cd IN ('OW') and @delivery_cd IN ('DW' ,''))
		INSERT INTO @Table_TF(state_cd, info) VALUES('PF', '결제완료')
	
	IF (@pay_cd IN ('PF') and @order_cd IN ('CT', 'CW', '') and @delivery_cd IN ('DC', 'TF'))
		or (@pay_cd IN ('PF') and @order_cd IN ('OF') and @delivery_cd IN ('DW', 'DK'))
		INSERT INTO @Table_TF(state_cd, info) VALUES('RW', '환불대기')

	IF (@pay_cd IN ('RW') and @order_cd IN ('CT', 'CW') and @delivery_cd IN ('DC', 'TF'))
		INSERT INTO @Table_TF(state_cd, info) VALUES('RF', '환불완료')
	
	
	-- 주문상태 검사
	IF (@pay_cd IN ('PW', 'PC') and @order_cd IN ('OW') and @delivery_cd IN ('DW', 'DC'))
		or (@pay_cd IN ('RF') and @order_cd IN ('CT', 'CW') and @delivery_cd IN ('DC', 'TF'))
		or (@pay_cd IN ('') and @order_cd IN ('') and @delivery_cd IN (''))
		INSERT INTO @Table_TF(state_cd, info) VALUES('OC', '주문취소')

	IF (@pay_cd IN ('PF') and @order_cd IN ('OW', 'CR')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('OF', '주문완료')

	IF (@pay_cd IN ('PF') and @order_cd IN ('OF') and @delivery_cd IN ('DK', 'DR', 'DS', 'DF')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('CR', '취소요청')
			
	IF (@pay_cd IN ('PF') and @order_cd IN ('OF', 'CR')) and @delivery_cd IN ('DW', 'DK', 'DR')
		INSERT INTO @Table_TF(state_cd, info) VALUES('CW', '취소대기')

	IF (@pay_cd IN ('PF') and @order_cd IN ('OF', 'CR')) and @delivery_cd IN ('DR', 'DS', 'DF')
		INSERT INTO @Table_TF(state_cd, info) VALUES('CT', '취소대기(반품처리)')


	-- 배송상태 검사
	IF (@pay_cd IN ('PW', 'PC') and @order_cd IN ('OW', 'OC') and @delivery_cd IN ('DW', ''))
		or (@pay_cd IN ('RW', 'PF') and @order_cd IN ('CW') and @delivery_cd IN ('DW', 'DK', 'DR')) 
		or (@pay_cd IN ('') and @order_cd IN ('') and @delivery_cd IN ('')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('DC', '배송취소')		

	IF (@pay_cd IN ('PF') and @order_cd IN ('OF') and @delivery_cd IN ('DW')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('DK', '배송확인')
	
	IF (@pay_cd IN ('PF') and @order_cd IN ('OF') and @delivery_cd IN ('DK')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('DR', '배송준비')
	
	IF (@pay_cd IN ('PF') and @order_cd IN ('OF') and @delivery_cd IN ('DK', 'DR')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('DS', '배송발송')
	
	IF (@pay_cd IN ('PF') and @order_cd IN ('OF') and @delivery_cd IN ('DK', 'DR', 'DS')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('DF', '배송완료')

	IF (@pay_cd IN ('PF') and @order_cd IN ('CT') and @delivery_cd IN ('DR', 'DS', 'DF')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('TW', '반품대기')		
	
	IF (@pay_cd IN ('PF') and @order_cd IN ('CT') and @delivery_cd IN ('TW')) 
		INSERT INTO @Table_TF(state_cd, info) VALUES('TF', '반품완료')
	

	RETURN 
END

-- ##############################################################
-- #### TEST AREA
/*
	select * from ord_tf_state_check(NULL, NULL, NULL)
	select * from ord_tf_state_check('PW', 'OW', NULL)
	
	
	-- 일반주문처리 (입금확인 > 배송대기 > 배송확인 > 배송준비, 배송발송, 배송완료
	select * from ord_tf_state_check('PW', 'OW', 'DW')
	select * from ord_tf_state_check('PF', 'OF', 'DW')
	select * from ord_tf_state_check('PF', 'OF', 'DK')
	select * from ord_tf_state_check('PF', 'OF', 'DR')
	select * from ord_tf_state_check('PF', 'OF', 'DS')
	select * from ord_tf_state_check('PF', 'OF', 'DF')
	
	-- 주문완료 > (배송처리...) > 배송완료 > 취소요청 > 취소대기
	select * from ord_tf_state_check('PW', 'OW', 'DW')
	select * from ord_tf_state_check('PC', 'OW', 'DW')
	select * from ord_tf_state_check('PW', 'OC', 'DW')
	select * from ord_tf_state_check('PF', 'OW', 'DW')
	select * from ord_tf_state_check('PF', 'OF', 'DW')

	-- 배송확인 > 배송완료 > 취소요청 > 취소처리
	select * from ord_tf_state_check('PF', 'OF', 'DK')
	select * from ord_tf_state_check('PF', 'OF', 'DR')
	select * from ord_tf_state_check('PF', 'OF', 'DS')
	select * from ord_tf_state_check('PF', 'OF', 'DF')
	select * from ord_tf_state_check('PF', 'CR', 'DF')	-- 취소요청
	select * from ord_tf_state_check('PF', 'CT', 'TW')
	select * from ord_tf_state_check('PF', 'CT', 'TF')
	select * from ord_tf_state_check('RW', 'CT', 'TF')
	select * from ord_tf_state_check('RF', 'CT', 'TF')
	select * from ord_tf_state_check('RF', 'OC', 'TF')
	
	-- 배송확인 > 취소요청/취소처리 
	select * from ord_tf_state_check('PF', 'OF', 'DK')
	select * from ord_tf_state_check('PF', 'CR', 'DK')
	select * from ord_tf_state_check('PF', 'CW', 'DK')
	select * from ord_tf_state_check('PF', 'CW', 'DC')
	select * from ord_tf_state_check('RW', 'CW', 'DC')
	select * from ord_tf_state_check('RF', 'CW', 'DC')
	select * from ord_tf_state_check('RF', 'OC', 'DC')
	
	-- 배송준비 > 취소요청/취소처리  (일반취소)
	select * from ord_tf_state_check('PF', 'OF', 'DR')
	select * from ord_tf_state_check('PF', 'CR', 'DR')
	select * from ord_tf_state_check('PF', 'CW', 'DR')	-- 일반취소
	select * from ord_tf_state_check('PF', 'CW', 'DC')
	select * from ord_tf_state_check('RW', 'CW', 'DC')
	select * from ord_tf_state_check('RF', 'CW', 'DC')
	select * from ord_tf_state_check('RC', 'CW', 'DC')
	
	-- 배송준비 > 취소요청/취소처리  (반품취소)
	select * from ord_tf_state_check('PF', 'OF', 'DR')
	select * from ord_tf_state_check('PF', 'CR', 'DR')
	select * from ord_tf_state_check('PF', 'CT', 'DR')
	select * from ord_tf_state_check('PF', 'CT', 'TW')
	select * from ord_tf_state_check('PF', 'CT', 'TF')
	select * from ord_tf_state_check('RW', 'CT', 'TF')
	select * from ord_tf_state_check('RF', 'CT', 'TF')
	select * from ord_tf_state_check('OC', 'CT', 'TF')
	
*/
GO
