USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Delivery_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Delivery_SP_C]

	@prt_id						int	,
	@method_cd					char(4)			= 'FREE',	-- 무료 (*기본)		 
	@default_cd					char(3)			= 'DLV',	-- 택배 (*기본)
	@choice_bt					char(5)			= '00000',
	@deli_mn					int				= 0,
	@under_mn					int				= 0,
	@underBase_mn				int				= 0,
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
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END
		IF LEN(@method_cd) <= 0 OR @method_cd IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @method_cd ', 16, @RESULT);
		END
		IF LEN(@default_cd) <= 0 OR @default_cd IS NULL
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @default_cd ', 16, @RESULT);
		END
		
		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO PRT_Delivery
		(
			prt_id, 
			method_cd,
			default_cd,
			choice_bt,
			deli_mn,
			under_mn,
			underBase_mn
		)
		VALUES
		(
			@prt_id, 
			@method_cd,
			@default_cd,
			@choice_bt,
			@deli_mn,
			@under_mn,
			@underBase_mn
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
-- ## TEST AREA
/*
exec [PRT_Delivery_SP_C] @prt_id=1		-- 오류 필수없음
exec [PRT_Delivery_SP_C] @prt_id=1, @method_cd='FREE'	-- 오류: 기본방법 없음

exec [PRT_Delivery_SP_C] @prt_id=1, @method_cd='FREE', @default_cd='DIR'

select * from PRT_Delivery
select * from PRT_M_base
select * from sys_errorlog	
*/



GO
