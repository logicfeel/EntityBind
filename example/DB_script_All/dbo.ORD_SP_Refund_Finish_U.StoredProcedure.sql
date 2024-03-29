USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_SP_Refund_Finish_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2019-01-16
-- Update date	: 
-- Description	: 
/*

*/
-- ==============================================================
CREATE PROC [dbo].[ORD_SP_Refund_Finish_U]

	@ord_id						varchar(14),				-- PK
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- DECLARE LOCAL ---- */
	DECLARE @state_cd			char(2)			= 'RF'
	DECLARE @O_state_cd			char(2)
	DECLARE @D_state_cd			char(2)
	DECLARE @P_state_cd			char(2)
	
	DECLARE @meb_idx			int				= NULL
	DECLARE @usePoint_it		int				= 0
	DECLARE @point_it			int				= 0

	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사
		IF LEN(@ord_id) <= 0 or @ord_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @ord_id ', 16, @RESULT);
		END

		
		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM ORD_Pay WHERE ord_id = @ord_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_Master ', 16, @RESULT);
		END
		
		
		-- 검사 (유효성)
		IF NOT EXISTS(SELECT * FROM ORD_TF_Next_State_Check(@ord_id, @state_cd))
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 유효성 검사 : ORD_TF_Next_State_Check ', 16, @RESULT);
		END
		
		-- 조회 (포인트)
		SELECT 
			@usePoint_it = ISNULL(usePoint_it, 0),
			@meb_idx = b.meb_idx
		FROM ORD_Pay a, ORD_Master b WHERE a.ord_id = @ord_id and a.ord_id = b.ord_id

		-- 조회 (포인트)
		SELECT @point_it = ISNULL(SUM(a.point_it), 0) FROM ORD_Product a WHERE a.ord_id = @ord_id and a.del_yn ='N'


		/*******************************************************/
		-- 처리 (수정) : SP호출
		EXEC [ORD_Pay_SP_Status_U] 
				@ord_id = @ord_id, 
				@state_cd = @state_cd

		-- 처리 (포인트) : 사용포인트 지급
		IF @usePoint_it > 0 
		BEGIN
			EXEC [POT_MebPoint_SP_C] 
					@meb_idx	= @meb_idx, 
					@point_it	= @usePoint_it, 
					@ord_id		= @ord_id,
					@caption	= '환불완료(포인트복구)', 
					@minus_yn	= 'N'
		END

		-- 처리 (포인트) : 지급 포인트 회수
		IF @point_it > 0 and @meb_idx IS NOT NULL
		BEGIN
			EXEC [POT_MebPoint_SP_C] 
					@meb_idx	= @meb_idx, 
					@point_it	= @point_it, 
					@ord_id		= @ord_id,
					@caption	= '환불완료(포인트회수)', 
					@minus_yn	= 'Y'
		END

		/*******************************************************/
		-- 커밋

		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

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
	exec [STO_Base_SP_C]	99		
	
	select 0
	
*/



GO
