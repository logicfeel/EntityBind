USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[STO_Master_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[STO_Master_SP_C]

	@sto_id						varchar(6)		= '' OUTPUT,
	@stoName					nvarchar(20),	
	@sto_code					char(1)			= 'S',				
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력
	
AS


BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE LOCAL ---- */
	DECLARE @RESULT				int				= 0;
	
--	DECLARE @sto_id				varchar(6)
	DECLARE @code_langth		int				= LEN(@sto_code)
	DECLARE @max_idx			int
			

	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@stoName) <= 0 OR @stoName IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @stoName ', 16, @RESULT);
		END

		
		/*******************************************************/
		-- 처리 (max idx 조회)
		IF NOT EXISTS (SELECT * FROM STO_Master WHERE LEFT(sto_id, 1) = @sto_code)
			SET @max_idx = 1
		ELSE
			SELECT @max_idx = (
				CAST(SUBSTRING(sto_id, @code_langth + 1, LEN(sto_id) - @code_langth)
				AS int) + 1
			) 
			FROM STO_Master WHERE LEFT(sto_id, 1) = @sto_code
		
		
		-- 처리 (sto_id 구성)
		SET @sto_id = @sto_code + RIGHT('0000' + CAST(@max_idx AS varchar), 5)	--5자리 기준


		-- 처리 (등록)
		INSERT INTO STO_Master
		(
			sto_id,
			stoName
		)
		VALUES
		(
			@sto_id,
			@stoName
		)

		
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

	exec [STO_Base_SP_C] @stoName = N'임시상점', @sto_code ='K', 
	exec [STO_Base_SP_C] @stoName = N'임시상점', @sto_code ='S'

	select * from STO_Master

*/



GO
