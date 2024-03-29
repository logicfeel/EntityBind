USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[POT_Master_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[POT_Master_SP_U]

	@pot_id						int,						-- PK
	@identifier					varchar(20)		= NULL,
	@pointName					nvarchar(20)	= NULL,
	@method_cd					char(1)			= NULL,
	@point_it					int				= NULL,
	@percent_it					int				= NULL,
	@use_yn						char(1)			= NULL,
	@contents					nvarchar(100)	= NULL,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력		
	
AS

BEGIN
	SET NOCOUNT ON
	/* -----  DECLARE GLOBAL ------ */
	DECLARE @Result				int = 0;


	/* ----- DECLARE LOCAL ---- */
	
	
	/* ----- TRANSACTION ------ */
	DECLARE @TranCounter		int				= @@TRANCOUNT
    IF @TranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION

	
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF @pot_id <= 0 OR @pot_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @pot_id ', 16, @RESULT);
		END


		-- 검사 (ident 중복)
		IF @identifier IS NOT NULL AND LEN(@identifier) > 0 
			AND EXISTS(SELECT * FROM POT_Master WHERE identifier = @identifier and pot_id <> @pot_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 중복 : @identifier ', 16, @RESULT);				
		END

		
		IF @method_cd IS NOT NULL
		BEGIN
			-- 검사 (퍼센트, 포인트 값지정)
			IF @method_cd = 'F'
			BEGIN
				SET @percent_it = 0
			END
			ELSE IF @method_cd = 'P'
			BEGIN
				SET @point_it = 0
			END
			ELSE IF @method_cd = 'E'
			BEGIN
				SET @percent_it = 0
				SET @point_it = 0
			END
			ELSE
			BEGIN
				SET @RESULT = 211
				RAISERROR ('[오류] F, P, E 아님  : @method_cd ', 16, @RESULT);
			END

		
			-- 검사 (고정값)
			IF @method_cd = 'F' and 
				(@point_it IS NULL or @point_it <= 0)
			BEGIN
				SET @RESULT = 212
				RAISERROR ('[오류] Fix point 0보다 작음  : @method_cd ', 16, @RESULT);
			END


			-- 검사 (고정퍼센트, 범위 : 1% ~ 99%)
			IF @method_cd = 'P' and 
				(@percent_it IS NULL or (@percent_it <= 0 OR @percent_it >= 100))  
			BEGIN
				SET @RESULT = 213
				RAISERROR ('[오류] Percent point 범위 : 1~99  : @method_cd ', 16, @RESULT);
			END						
		END	

		
		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM POT_Master WHERE pot_id = @pot_id)
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 데이터 없음 : PRT_M_Base ', 16, @RESULT);
		END	
				
			
		/*******************************************************/
		-- 처리 (수정)
		UPDATE POT_Master 
		SET
			identifier = CASE WHEN @identifier IS NULL THEN identifier ELSE @identifier END,
			pointName = CASE WHEN @pointName IS NULL THEN pointName ELSE @pointName END,
			method_cd = CASE WHEN @method_cd IS NULL THEN method_cd ELSE @method_cd END,
			point_it = CASE WHEN @point_it IS NULL THEN point_it ELSE @point_it END,
			percent_it = CASE WHEN @percent_it IS NULL THEN percent_it ELSE @percent_it END,
			use_yn = CASE WHEN @use_yn IS NULL THEN use_yn ELSE @use_yn END,
			contents = CASE WHEN @contents IS NULL THEN contents ELSE @contents END
		WHERE
			pot_id = @pot_id

		
		/*******************************************************/
		-- 결과 (커밋)

		/* ----- TRANSACTION ------ */
		IF @TranCounter = 0
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
	exec [POT_Base_SP_U] @pot_id=5
	exec [POT_Base_SP_U] @pot_id=5, @identifier='AAAA8'
	exec [POT_Base_SP_U] @pot_id=4, @method_cd='F', @point_it=33, @percent_it=20
	exec [POT_Base_SP_U] @pot_id=5, @method_cd='P', @point_it=33, @percent_it=20
	exec [POT_Base_SP_U] @pot_id=4, @method_cd='F'
	exec [POT_Base_SP_U] @pot_id=4, @method_cd='P'
	
-- 오류 : 중복	
	exec [POT_Base_SP_U] @pot_id=5, @identifier='AAAA7'

-- 오류 : 코드 범위	
	exec [POT_Base_SP_U] @pot_id=4, @method_cd='Z'
	
	
	select * from POT_Master
*/



GO
