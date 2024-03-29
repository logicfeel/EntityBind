USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	- PRT_Info, PRT_Delivery 는 검사 후 없으면 생성, 있으면 수정
	- [PRT_Master_SP_C] + [PRT_SP_U] : 조합가능
	- [PRT_SP_C] + [PRT_SP_U] : 조합가능
*/
-- ==============================================================
CREATE PROC [dbo].[PRT_SP_U]

	@prt_id				int,								-- PK
	@prtName			nvarchar(30)			= NULL,
	
	@state_cd					char(2)			= NULL,
	@stock_it					smallint		= NULL,
	@brd_idx					smallint		= NULL,
	@recommRange				smallint		= NULL,
	@keyword					nvarchar(100)	= NULL,
	@kind_cd					char(3)			= NULL,
	@begin_dt					smalldatetime	= NULL,
	@close_dt					smalldatetime	= NULL,
	@contents					nvarchar(2000)	= NULL,

	@method_cd					char(4)			= NULL,		 
	@default_cd					char(3)			= NULL,	
	@choice_bt					char(5)			= NULL,
	@deli_mn					int				= NULL,
	@under_mn					int				= NULL,
	@underBase_mn				int				= NULL,

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
		-- 검사
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM PRT_Master WHERE prt_id = @prt_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : PRT_Master ', 16, @RESULT);
		END

		/*******************************************************/
		-- 처리 (수정) : SP호출
		EXEC [PRT_Master_SP_U] @prt_id = @prt_id, @prtName=@prtName


		
		-- 처리 (등록/수정) : SP호출
		IF EXISTS(SELECT * FROM PRT_Info WHERE prt_id = @prt_id)
		BEGIN
			EXEC [PRT_Info_SP_U] 
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
		END	
		ELSE
		BEGIN
			-- **sp호출시 파라메터를 지정하면, SP 기본값은 무시되어 기본값 재설정 **
			-- 기본값 설정
			IF @state_cd IS NULL SET @state_cd = 'SS'
			IF @stock_it IS NULL SET @stock_it = 0
			IF @recommRange IS NULL SET @recommRange = 0
			IF @keyword IS NULL SET @keyword = ''
			IF @kind_cd IS NULL SET @kind_cd = ''
			IF @contents IS NULL SET @contents = ''
			
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
		END
		
				
		-- 처리 (등록/수정) : SP호출
		IF EXISTS(SELECT * FROM PRT_Delivery WHERE prt_id = @prt_id)		
		BEGIN
			EXEC [PRT_Delivery_SP_U]
					@prt_id = @prt_id,
					@method_cd = @method_cd,
					@default_cd = @default_cd,
					@choice_bt = @choice_bt,
					@deli_mn = @deli_mn,
					@under_mn = @under_mn,
					@underBase_mn = @underBase_mn
		END
		ELSE				
		BEGIN
			-- ** sp호출시 파라메터를 지정하면, SP 기본값은 무시되어 기본값 재설정 **
			-- 기본값 설정 
			IF @method_cd IS NULL SET @method_cd = 'SS'
			IF @default_cd IS NULL SET @default_cd = 0
			IF @choice_bt IS NULL SET @choice_bt = 0
			IF @keyword IS NULL SET @keyword = ''
			IF @kind_cd IS NULL SET @kind_cd = ''
			IF @contents IS NULL SET @contents = ''

			EXEC [PRT_Delivery_SP_C]
					@prt_id = @prt_id,
					@method_cd = @method_cd,
					@default_cd = @default_cd,
					@choice_bt = @choice_bt,
					@deli_mn = @deli_mn,
					@under_mn = @under_mn,
					@underBase_mn = @underBase_mn
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

	EXEC [PRT_SP_U] 1, N'임시상품(수정)..', 'RS'
	EXEC [PRT_SP_U] 1, N'임시상품', 'SS'
	EXEC [PRT_SP_U] 2, N'임시상품(수정)', 'SS'	-- 오류발생
	EXEC [PRT_SP_U] '', N'임시상품(수정)', 'RS'	-- 오류발생
	EXEC [PRT_SP_U] NULL, N'임시상품(수정)', 'RS'	-- 오류발생
	EXEC [PRT_SP_U] 0, N'임시상품(0)', 'RS'	-- 오류발생
	EXEC [PRT_SP_U] 1, '', 'RS'	-- 오류발생 (base)
	EXEC [PRT_SP_U] 1, '상품(1)', ''	-- 오류발생 (info)

	EXEC [PRT_SP_U] 
		@prt_id = 16, 
		@state_cd = 'SD',
		@stock_it = 99,
		@recommRange = 12,
		@keyword = N'침대',
		@begin_dt = '2020-01-01',
		@kind_cd = 'NEW',
		@contents = 'init..'
		
	EXEC [PRT_Info_SP_U] 
		@prt_id = 16, 
		@state_cd = 'SD',
		@stock_it = 99,
		@recommRange = 12,
		@keyword = N'침대',
		@begin_dt = '2020-01-01',
		@kind_cd = 'NEW',
		@contents = 'init..'

	EXEC [PRT_SP_U] 
		@prt_id = 16, 
		@state_cd = 'SV'
		
	EXEC [PRT_SP_U]
		@prt_id = 16, 
		@keyword = '유아(수정)'		

	EXEC [PRT_SP_U] 
		@prt_id = 16, 
		@default_cd = 'VST'		
			
	select * from PRT_Master
	select * from PRT_Info
	select * from PRT_delivery
	
	select * from SYS_ErrorLog

	-- 초기화
	delete from SYS_ErrorLog

*/


GO
