USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[ORD_TF_State_Info]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE FUNCTION [dbo].[ORD_TF_State_Info]
(
	@state_cd					char(2)
)
RETURNS 
@Table_TF TABLE 
(
	idx							int IDENTITY(1,1),
	info						nvarchar(20)
)
AS
BEGIN
	/*******************************************************/

	DECLARE @info		nvarchar(20)			= '';

	SELECT @info = 
		CASE @state_cd
			WHEN 'PW' THEN '결제대기'
			WHEN 'PC' THEN '결제취소'
			WHEN 'PF' THEN '결제완료'
			WHEN 'RW' THEN '환불대기'
			WHEN 'RF' THEN '환불완료'
			WHEN 'OW' THEN '주문대기'
			WHEN 'OC' THEN '주문취소'
			WHEN 'OF' THEN '주문완료'
			WHEN 'CR' THEN '취소요청'
			WHEN 'CW' THEN '취소대기'
			WHEN 'CT' THEN '취소대기(반품처리)'
			WHEN 'DW' THEN '배송대기'
			WHEN 'DC' THEN '배송취소'
			WHEN 'DK' THEN '배송확인'
			WHEN 'DR' THEN '배송준비'
			WHEN 'DS' THEN '배송발송'
			WHEN 'DF' THEN '배송완료'
			WHEN 'TW' THEN '반품대기'
			WHEN 'TF' THEN '반품완료'
			ELSE ''
      END

	INSERT INTO @Table_TF(info) VALUES(@info)

	RETURN 
END

-- ##############################################################
-- #### TEST AREA
/*
	select * from ORD_TF_State_Info('PW')
	select * from ORD_TF_State_Info('Pd')
	
*/
GO
