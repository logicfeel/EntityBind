USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[ORD_TF_State]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	@area_cd
	O : Order(Master)
	P : Pay
	D : Delivery
	
	## REVIEW 이후에 테이블정보에 추가도 가능함
*/
-- ==============================================================
CREATE FUNCTION [dbo].[ORD_TF_State]
(
	@area_cd					char(1)			= NULL
)
RETURNS 
@Table_TF TABLE 
(
	idx							int IDENTITY(1,1),
	area_cd						char(1),
	state_cd					char(2),
	info						nvarchar(10)
)
AS
BEGIN
	IF @area_cd IS NULL or LEN(@area_cd) = 0 or @area_cd = 'P'
	BEGIN
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('P', 'PC', '결제취소')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('P', 'PW', '결제대기')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('P', 'PF', '결제완료')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('P', 'RW', '환불대기')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('P', 'RF', '환불완료')
	END

	IF @area_cd IS NULL or LEN(@area_cd) = 0 or @area_cd = 'O'
	BEGIN
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('O', 'OC', '주문취소')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('O', 'OW', '주문대기')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('O', 'OF', '주문완료')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('O', 'CR', '취소요청')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('O', 'CW', '취소대기')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('O', 'CT', '취소대기(반품처리)')
	END

	IF @area_cd IS NULL or LEN(@area_cd) = 0 or @area_cd = 'D'
	BEGIN
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('D', 'DC', '배송취소')		
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('D', 'DW', '배송대기')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('D', 'DK', '배송확인')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('D', 'DR', '배송준비')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('D', 'DS', '배송발송')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('D', 'DF', '배송완료')
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('D', 'TW', '반품대기')		
		INSERT INTO @Table_TF(area_cd, state_cd, info) VALUES('D', 'TF', '반품완료')
	END
	
	RETURN 
END

-- ##############################################################
-- #### TEST AREA
/*
	select * from ord_tf_state_check(NULL, NULL, NULL)
	
	
	select * from ORD_TF_State(NULL)
	select * from ORD_TF_State('P')
	select * from ORD_TF_State('')

	
*/
GO
