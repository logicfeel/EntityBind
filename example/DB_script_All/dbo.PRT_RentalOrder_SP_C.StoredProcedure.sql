USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_RentalOrder_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_RentalOrder_SP_C]

	@stc_cnt					int,
	@prt_id						int,
	@begin_dt					smalldatetime,
	@close_dt					smalldatetime,
	@ord_id						varchar(14)		= '',
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;


	/* ----- DECLARE LOCAL ---- */
	DECLARE @ro_idx				int
	
	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END
		IF @stc_cnt <= 0 OR @stc_cnt IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @stc_cnt ', 16, @RESULT);
		END		
		IF @begin_dt IS NULL
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @begin_dt ', 16, @RESULT);
		END
		IF @close_dt IS NULL
		BEGIN
			SET @RESULT = 104
			RAISERROR ('[오류] 필수값 없음 : @close_dt ', 16, @RESULT);
		END				

		
		-- 검사 (시작날짜 - 종료날짜)
		IF @begin_dt > @close_dt
		BEGIN
			SET @RESULT = 211
			RAISERROR ('[오류] 시작날짜 > 종료날짜 : @close_dt ', 16, @RESULT);
		END				


		-- 검사 (데이터) : 분리된 모듈[컴포넌트]
		IF LEN(@ord_id) > 0 
			AND NOT EXISTS(SELECT * FROM ORD_Master WHERE ord_id = @ord_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_Master ', 16, @RESULT);				
		END
		
		
		-- 검사 (데이터) : 대기상태 검사
		IF NOT EXISTS(SELECT * FROM PRT_Rental WHERE prt_id = @prt_id AND stc_cnt = @stc_cnt AND state_cd = 'R')
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 대기상태 아님(R) : PRT_Rental ', 16, @RESULT);				
		END		
		

		/*******************************************************/
		-- 처리 (opt_idx 생성)
		SELECT @ro_idx = (ISNULL(MAX(ro_idx), 0) + 1) 
		FROM PRT_RentalOrder 
		WHERE prt_id = @prt_id AND stc_cnt = @stc_cnt
		

		-- 처리 (등록)
		INSERT INTO PRT_RentalOrder
		(
			prt_id,
			stc_cnt,
			ro_idx,
			begin_dt,
			close_dt,
			ord_id
		)
		VALUES
		(
			@prt_id,
			@stc_cnt,
			@ro_idx,
			@begin_dt,
			@close_dt,
			@ord_id
		)
		
		---------------------------------------
		-- TODO:: 렌탈상품을 출고 상태로 변경해야함 (R -> O)
				

		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

		RETURN @RESULT
	END TRY
	BEGIN CATCH /***********************************************/
		/* ----- DECLARE CATCH ---- */
		DECLARE @errorMessage	nvarchar(1000)	= ERROR_MESSAGE();
		DECLARE @errorSeverity	int				= ERROR_SEVERITY();
		DECLARE @errorState		int				= ERROR_SEVERITY();
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
exec [PRT_RentalOrder_SP_C]	@prt_id=1, @stc_cnt=1,
	@begin_dt='2020-01-01', @close_dt='2020-01-02'
	
-- 오류 : 시작날짜 큼
exec [PRT_RentalOrder_SP_C]	@prt_id=1, @stc_cnt=1,
	@begin_dt='2020-02-01', @close_dt='2020-01-02'	

-- 오류 : 주문번호
exec [PRT_RentalOrder_SP_C]	@prt_id=1, @stc_cnt=1,
	@begin_dt='2020-01-01', @close_dt='2020-01-02', @ord_id ='aaaa'


select * from PRT_Rental
select * from PRT_RentalOrder
	
*/



GO
