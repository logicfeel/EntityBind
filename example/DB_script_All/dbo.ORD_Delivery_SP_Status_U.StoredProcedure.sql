USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Delivery_SP_Status_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	!! 프로시저 외부에서 직접 호출 금지!!
	deli_id 입력시 단일 배송지 수정
	ord_id  입력시 복합 배송지 수정
*/
-- ==============================================================
CREATE PROC [dbo].[ORD_Delivery_SP_Status_U]

	@deli_idx					int				= NULL,		-- PK
	@ord_id						varchar(14)		= NULL,
	@state_cd					char(2),
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- DECLARE LOCAL ---- */


	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION
	
		
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF (@deli_idx <= 0 or @deli_idx IS NULL) and (Len(@ord_id) <= 0 or @ord_id IS NULL)
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @deli_idx 또는 @ord_id ', 16, @RESULT);
		END
		IF LEN(@state_cd) <= 0 or @state_cd IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @state_cd ', 16, @RESULT);
		END

		-- 검사 (데이터)
		IF @ord_id IS NOT NULL and NOT EXISTS(SELECT * FROM ORD_Delivery WHERE ord_id = @ord_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_Delivery ', 16, @RESULT);
		END	
		ELSE IF @deli_idx IS NOT NULL and NOT EXISTS(SELECT * FROM ORD_Delivery WHERE deli_idx = @deli_idx)
		BEGIN
			SET @RESULT = 203
			RAISERROR ('[오류] 데이터 없음 : ORD_Delivery ', 16, @RESULT);
		END			


		-- 검사 (유효성)
		IF NOT EXISTS(SELECT * FROM ORD_TF_State('D') WHERE state_cd = @state_cd)
		BEGIN
			SET @RESULT = 203
			RAISERROR ('[오류] 유효성 : @state_cd ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정) : 단일정보
		IF @ord_id IS NOT NULL
			UPDATE ORD_Delivery 
			SET	state_cd = @state_cd
			WHERE ord_id = @ord_id
		ELSE
			UPDATE ORD_Delivery 
			SET	state_cd = @state_cd
			WHERE deli_idx = @deli_idx

		
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
	exec [STO_Base_SP_C]	99		
	
	select * from ORD_Delivery
	
*/



GO
