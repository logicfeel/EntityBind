USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_Finish_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_SP_Finish_U]

	@ord_id						varchar(14),
	@pg_yn						char(1)			= 'N',		-- PG결제 여부 (외부모듈을 DB로 검사)
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- DECLARE LOCAL ---- */
	DECLARE @state_cd			char(2)			= 'DS'
	
	DECLARE @meb_idx			int				= NULL
	DECLARE @usePoint_it		int				= 0

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
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @ord_id ', 16, @RESULT);
		END


		-- 검사 (데이터) : PG LG로 고정 지정됨
		IF @pg_yn = 'Y' and NOT EXISTS(SELECT * FROM ORD_PG_Toss WHERE ord_id = @ord_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_PG_Toss ', 16, @RESULT);
		END

		-- 검사 (유효성)
		IF @pg_yn = 'Y' and NOT EXISTS(SELECT * FROM ORD_Pay a, ORD_PG_Toss b 
				WHERE a.ord_id = @ord_id and a.ord_id = b.ord_id and a.pay_mn = b.amount)
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 유효성 : ORD_Pay.pay_mn != ORD_PG.pay_mn ', 16, @RESULT);
		END	

		-- 조회 (포인트)
		SELECT 
			@usePoint_it = ISNULL(usePoint_it, 0),
			@meb_idx = b.meb_idx
		FROM ORD_Pay a, ORD_Master b WHERE a.ord_id = @ord_id and a.ord_id = b.ord_id


		/*******************************************************/
		-- 처리 

		-- 결제 대기
		EXEC [ORD_SP_Pay_Wait_U] @ord_id = @ord_id
		
		-- 처리 (수정) : 주문대기 (*초기화)
		EXEC [ORD_SP_Order_Wait_U] @ord_id = @ord_id
		
		-- 처리 (수정) : 배송대기 (*전체 초기화)
		EXEC [ORD_SP_Deli_Wait_U] @ord_id = @ord_id
		


		-- PG 결제의 경우 자동 승인
		IF @pg_yn = 'Y' and EXISTS(SELECT * FROM ORD_PG_Toss WHERE ord_id = @ord_id)
		BEGIN
			
			EXEC [ORD_SP_Approval_U] @ord_id = @ord_id
		END

		-- 처리 (포인트)
		IF @usePoint_it > 0 
		BEGIN
			EXEC [POT_MebPoint_SP_C] 
					@meb_idx	= @meb_idx, 
					@point_it	= @usePoint_it, 
					@ord_id		= @ord_id,
					@caption	= '주문결제(포인트사용)', 
					@minus_yn	= 'Y'
		END

		
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
	exec @r = ORD_SP_Finish_U @ord_id='20210216142725', @pg_yn='N'	
	select @r
	
*/





GO
