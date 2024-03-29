USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	통합하여 생성하는 경우
*/
-- ==============================================================
CREATE PROC [dbo].[PRT_SP_C]

	@sto_id						varchar(6),
	@prtName					nvarchar(30),
	@type_cd					char(2),

	@state_cd					char(2)			= 'SS',		-- SaleShow (기본값)
	@stock_it					smallint		= 0,
	@brd_idx					smallint		= NULL,
	@recommRange				smallint		= 0,
	@keyword					nvarchar(100)	= '',
	@kind_cd					char(3)			= '',
	@begin_dt					smalldatetime	= NULL,
	@close_dt					smalldatetime	= NULL,
	@contents					nvarchar(2000)	= '',

	@method_cd					char(4)			= 'FREE',		 
	@default_cd					char(3)			= 'DLV',	
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
		-- 처리 (등록) : SP호출
		EXEC @prt_id = [PRT_Master_SP_C] 
					@sto_id = @sto_id,
					@prtName = @prtName,
					@type_cd = @type_cd

		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 221
			RAISERROR ('[오류] 키 생성 : @prt_id ', 16, @RESULT);
		END

				
		-- 처리 (등록) : SP호출
		EXEC [PRT_Info_SP_C]
				@prt_id = @prt_id,
				@state_cd = @state_cd,
				@stock_it = @stock_it,
				@brd_idx = @brd_idx,
				@recommRange = @recommRange,
				@keyword = @keyword,
				@kind_cd = @kind_cd,
				@begin_dt = @begin_dt,
				@close_dt = @close_dt,
				@contents = @contents


		-- 처리 (등록) : SP호출
		EXEC [PRT_Delivery_SP_C]
				@prt_id = @prt_id,
				@method_cd = @method_cd,
				@default_cd = @default_cd,
				@choice_bt = @choice_bt,
				@deli_mn = @deli_mn,
				@under_mn = @under_mn,
				@underBase_mn = @underBase_mn
		
		
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
	exec [PRT_SP_C] @sto_id='S00001', @prtName='통합생성상품', @type_cd='DE'
	
	exec [PRT_SP_C] @sto_id='S00001', @prtName='통합생성상품', @type_cd='DE'
	
	select * from prt_master
	select * from prt_info
	select * from prt_delivery
	
*/




GO
