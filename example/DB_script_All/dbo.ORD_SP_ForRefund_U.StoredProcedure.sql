USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_ForRefund_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2019-12-20
-- Update date	: 
-- Description	: 
/*

*/
-- ==============================================================
CREATE PROC [dbo].[ORD_SP_ForRefund_U]

	@ord_id						varchar(14),
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- DECLARE LOCAL ---- */
	DECLARE @ord_state_str		varchar(20)			= 'CR, OF'
	DECLARE @pay_state_str		varchar(20)			= 'PF'
	
	DECLARE @DeliKey TABLE (
		idx					int IDENTITY(1,1),			-- PK
		deli_idx			int
	);

	DECLARE @deli_max_cnt		int				= 0
	DECLARE @tmp_deli_idx		int				= 0
	

	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@ord_id) <= 0 or @ord_id IS NULL
		BEGIN
			SET @RESULT = 11
			RAISERROR ('[오류] 필수값 없음 : @ord_id ', 16, @RESULT);
		END


		-- 검사 (데이터) 
		IF NOT EXISTS(SELECT * FROM ORD_Master WHERE ord_id = @ord_id)
		BEGIN
			SET @RESULT = 21
			RAISERROR ('[오류] 데이터 없음 : ORD_Master ', 16, @RESULT);
		END


		-- 검사 (유효성)
		IF NOT EXISTS(
			SELECT * FROM ORD_Master a, ORD_Pay b
			WHERE 1 =1
			and a.ord_id = @ord_id 
			and a.ord_id = b.ord_id 
			and CHARINDEX (a.state_cd, @ord_state_str) > 0
			and CHARINDEX (b.state_cd, @pay_state_str) > 0
			)
		BEGIN
			SET @RESULT = 22
			RAISERROR ('[오류] 유효성 : ORD_Master(OF/CR), ORD_Pay(PF) ', 16, @RESULT);
		END	

		-- 조회 : 배송지
		INSERT INTO @DeliKey(deli_idx)
		SELECT distinct a.deli_idx
		FROM ORD_Delivery a
		WHERE a.ord_id = @ord_id
			and a.del_yn = 'N'
		
		-- 조회 : 상점수
		SET @deli_max_cnt = @@ROWCOUNT
				
		/*******************************************************/
		--  처리 순서 중요!! 결제승인후 >> 주문승인

		-- 처리 (수정) : 취소대기
		EXEC [ORD_SP_Cancel_Wait_U] @ord_id = @ord_id

		-- 배송취소
		WHILE (0 < @deli_max_cnt)
		BEGIN
			SELECT @tmp_deli_idx = deli_idx	FROM @DeliKey WHERE idx = @deli_max_cnt

			-- 처리 (수정) : 배송취소
			EXEC [ORD_SP_Deli_Cancel_U] @ord_id = @ord_id, @deli_idx = @tmp_deli_idx
		
			-- 반복문 : idx 및 cnt 감소			
			SET @deli_max_cnt = @deli_max_cnt - 1				-- 반복수 감소
		END

		-- 처리 (수정) : 환불대기
		EXEC [ORD_SP_Refund_Wait_U] @ord_id = @ord_id
		
		
		/*******************************************************/
		-- 커밋

		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

		RETURN @RESULT
	END TRY
	BEGIN CATCH /***********************************************/
		/* ----- DECLARE CATCH ---- */
		DECLARE @errorMessage	nvarchar(1000)	= ERROR_MESSAGE();
		DECLARE @errorSeverity	int				= ERROR_SEVERITY();
		DECLARE @errorState		int				= ERROR_STATE();
		DECLARE @procName		nvarchar(128)	= OBJECT_NAME(@@PROCID);
        
        /* ----- TRANSACTION ------ */
        IF @tranCounter = 0  
		BEGIN
			ROLLBACK TRANSACTION;
			EXEC [SYS_ErrorLog_SP_C] @procName, @msgPrint_yn, @msgSave_yn;
			RETURN -@errorState;
		END
        ELSE
        BEGIN
            IF XACT_STATE() <> -1  
                ROLLBACK TRANSACTION  ProcedureSave;
			SET @errorMessage = @procName +' >> '+ @errorMessage;
			RAISERROR(@errorMessage, @errorSeverity, @errorState);
		END
	END CATCH	
	SET NOCOUNT OFF
END

-- ##############################################################
-- #### TEST AREA
/*
	
	declare @r int
	exec @r = [ORD_SP_Approval_U] @ord_id='20210207105029'
	select @r
	
	select * from ord_master where ord_id = '20210207105029'
	select * from ord_pay where ord_id = '20210207105029'
	select * from ord_delivery where ord_id = '20210207105029'

	select * from SYS_ErrorLog	
	
			SELECT distinct a.deli_idx
		FROM ORD_Delivery a
		WHERE a.ord_id = '20210204052148'
			and a.del_yn = 'N'
			
			select @@ROWCOUNT
*/








GO
