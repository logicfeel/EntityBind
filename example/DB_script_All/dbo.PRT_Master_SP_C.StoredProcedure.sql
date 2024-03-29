USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Master_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Master_SP_C]

	@sto_id						varchar(6),
	@prtName					nvarchar(30),
	@type_cd					char(2),
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력	
AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
	
	
	/* ----- DECLARE LOCAL ---- */
	DECLARE @prt_id				int


	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION

	
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@sto_id) <= 0 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @sto_id ', 16, @RESULT);
		END
		IF LEN(@prtName) <= 0 
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @prtName ', 16, @RESULT);
		END
		IF LEN(@type_cd) <= 0 
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @type_cd ', 16, @RESULT);
		END

		
		/*******************************************************/
		-- 처리 (p_id 생성)
		SELECT @prt_id = (ISNULL(MAX(prt_id), 0) + 1) FROM PRT_Master
		
		-- 처리 (등록)
		INSERT INTO PRT_Master
		(
			prt_id, 
			sto_id, 
			prtName, 
			type_cd
		)
		VALUES
		(
			@prt_id, 
			@sto_id,	
			@prtName, 
			@type_cd
		)

		
		/*******************************************************/
		-- 결과 (커밋 및 리턴)
		/* ----- TRANSACTION ------ */
		IF @TranCounter = 0
			COMMIT TRANSACTION
					
		SET @RESULT = @prt_id
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
	select * from STO_M_Base	-- 상점조회

	EXEC [PRT_Base_SP_C] 'S00001', N'임시상품', 'RE'

	select * from PRT_Master

	-- 전체 초기화
	delete from PRT_Master

*/
GO
