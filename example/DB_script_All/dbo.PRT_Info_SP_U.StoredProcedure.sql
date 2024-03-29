USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Info_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Info_SP_U]

	@prt_id						int,						-- PK
	@state_cd					char(2)			= NULL,
	@stock_it					smallint		= NULL,
	@brd_idx					smallint		= NULL,
	@recommRange				smallint		= NULL,
	@keyword					nvarchar(100)	= NULL,
	@kind_cd					char(3)			= NULL,
	@begin_dt					smalldatetime	= NULL,
	@close_dt					smalldatetime	= NULL,
	@contents					nvarchar(2000)	= NULL,
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
		IF @prt_id <= 0 or @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_Info WHERE prt_id = @prt_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Info ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정)
		UPDATE PRT_Info 
		SET
			state_cd = CASE WHEN @state_cd IS NULL THEN state_cd ELSE @state_cd END,
			stock_it = CASE WHEN @stock_it IS NULL THEN stock_it ELSE @stock_it END,
			brd_idx = CASE WHEN @brd_idx IS NULL THEN brd_idx ELSE @brd_idx END,
			recommRange = CASE WHEN @recommRange IS NULL THEN recommRange ELSE @recommRange END,
			keyword = CASE WHEN @keyword IS NULL THEN keyword ELSE @keyword END,
			kind_cd = CASE WHEN @kind_cd IS NULL THEN kind_cd ELSE @kind_cd END,
			begin_dt = CASE WHEN @begin_dt IS NULL THEN begin_dt ELSE @begin_dt END,
			close_dt = CASE WHEN @close_dt IS NULL THEN close_dt ELSE @close_dt END,
-- 이런식으로 초기화함
--			close_dt = CASE WHEN @close_dt = cast(0 as datetime) THEN close_dt ELSE @close_dt END,
			contents = CASE WHEN @contents IS NULL THEN contents ELSE @contents END
		WHERE
			prt_id = @prt_id
		
		
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
	exec [PRT_Info_SP_U] @prt_id=1, @contents='수정1'
	exec [PRT_Info_SP_U] @prt_id=2, @contents='수정2'
	exec [PRT_Info_SP_U] @prt_id=43, @close_dt=NULL
	
	exec [PRT_Info_SP_U] @prt_id=43, @close_dt='2011-10-11'

	exec [PRT_Info_SP_U] @prt_id=43, @close_dt=NULL
	
	select * from PRT_Info
	
select cast(null as datetime) 	
*/



GO
