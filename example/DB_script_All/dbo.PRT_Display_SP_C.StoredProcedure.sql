USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Display_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Display_SP_C]

	@dspName					nvarchar(20),
	@parent_id					int				= 0,
	@rank_it					smallint		= 99,	
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		

	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@dspName) <= 0 OR @dspName IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @dspName ', 16, @RESULT);
		END
		IF @parent_id < 0
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 음수(-) : @parent_id ', 16, @RESULT);
		END
		
		-- 검사 (부모)
		IF @parent_id > 0 AND NOT EXISTS(SELECT * FROM PRT_Display WHERE dsp_id = @parent_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Display ', 16, @RESULT);
		END
				
		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO PRT_Display
		(
			dspName,
			parent_id,
			rank_it
		)
		VALUES
		(
			@dspName,
			@parent_id,
			@rank_it
		)

		
		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

		SET @RESULT = @@IDENTITY					
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
-- ## TEST AREA
/*
exec [PRT_Display_SP_C]	@dspName = '카테고리'		
exec [PRT_Display_SP_C]	@dspName = '카테고리', @parent_id= 1
exec [PRT_Display_SP_C]	@dspName = '카테고리2', @parent_id= 2


-- 오류 부모코드 없음
exec [PRT_Display_SP_C]	@dspName = '카테고리', @parent_id= 99


select * from prt_display
	
*/



GO
