USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Opinion_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
RESULT  @opi_idx
*/
-- ==============================================================
CREATE PROC [dbo].[PRT_Opinion_SP_C]

	@prt_id						int,
	@grade_cd					char(1),
	@ord_id						varchar(14)		= NULL,
	@contents					nvarchar(1000)	= '',
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력	
	
AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
	
	
	/* ----- DECLARE LOCAL ---- */
	DECLARE @opi_idx			int
	DECLARE @point_it			int				= 0
	
		
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION

	
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@prt_id) <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END
		IF LEN(@grade_cd) <= 0 OR @grade_cd IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @grade_cd ', 16, @RESULT);
		END		
		

		-- 검사 (데이터)
		-- TODO:: 주문정보 검사

		/*******************************************************/
		-- 처리 (point_it 조회)
		-- TODO::


		-- 처리 (opt_idx 생성)
		SELECT @opi_idx = (ISNULL(MAX(opi_idx), 0) + 1) 
		FROM PRT_Opinion WHERE prt_id = @prt_id
		
		
		-- 처리 (등록)
		INSERT INTO PRT_Opinion
		(
			prt_id,
			opi_idx,
			ord_id,
			point_it,
			contents,
			grade_cd
		)
		VALUES
		(
			@prt_id,
			@opi_idx,
			@ord_id,
			@point_it,
			@contents,
			@grade_cd
		)

		
		/*******************************************************/
		-- 결과 (커밋 및 리턴)
		/* ----- TRANSACTION ------ */
		IF @TranCounter = 0
			COMMIT TRANSACTION
					
		SET @RESULT = @opi_idx
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

select 0
	
*/



GO
