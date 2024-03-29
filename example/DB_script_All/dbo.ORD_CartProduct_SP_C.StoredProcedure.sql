USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_CartProduct_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_CartProduct_SP_C]

	@client_id					varchar(20)		= NULL,
	@meb_idx					int				= NULL,
	@crt_idx					int				= NULL,		-- PK
	@prt_id						int,						-- PK
	@opt_idx					int,						-- PK
	@qty_it						tinyint			= 1,
	@state_cd					char(1)			= 'P',		-- Put(넣다)
	@ord_id						varchar(14)		= NULL,
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
		IF @crt_idx IS NULL AND @client_id IS NULL AND @meb_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @crt_idx 또는 @client_id 또는 @meb_idx ', 16, @RESULT);
		END
		IF @prt_id <= 0 OR @prt_id IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END		
		IF @opt_idx <= 0 OR @opt_idx IS NULL
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @opt_idx ', 16, @RESULT);
		END		
		IF @qty_it <= 0 OR @qty_it IS NULL
		BEGIN
			SET @RESULT = 104
			RAISERROR ('[오류] 필수값 없음 : @qty_it ', 16, @RESULT);
		END		


		-- 검사 (데이터) : 분리된 모듈[컴포넌트]
		IF @meb_idx > 0 AND @meb_idx IS NOT NULL 
			AND NOT EXISTS(SELECT * FROM MEB_Master WHERE meb_idx = @meb_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : MEB_Master ', 16, @RESULT);				
		END
		IF NOT EXISTS(SELECT * FROM PRT_Option WHERE prt_id = @prt_id and opt_idx = @opt_idx)
		BEGIN
			SET @RESULT = 202
			RAISERROR ('[오류] 데이터 없음 : PRT_Option ', 16, @RESULT);				
		END

		
		-- 조회 (@crt_idx)
		IF @crt_idx < 0 OR @crt_idx IS NULL
		BEGIN
			EXEC @crt_idx = [ORD_Cart_SP_C] 
				@client_id = @client_id,
				@meb_idx = @meb_idx
		END


		-- 검사 (값)
		IF @crt_idx <= 0 OR @crt_idx IS NULL 
		BEGIN
			SET @RESULT = 105
			RAISERROR ('[오류] 필수값 없음 : @crt_idx ', 16, @RESULT);				
		END
		
		
		/*******************************************************/
		-- 처리 (등록) 회원 & 기존장바구니 키 변경 (값이 있으면)
		IF @meb_idx > 0 and @meb_idx IS NOT NULL and LEN(@client_id) > 0
			and EXISTS(SELECT *	FROM ORD_Cart a, ORD_CartProduct b 
						WHERE a.client_id = @client_id and a.crt_idx = b.crt_idx and b.del_yn = 'N')
		BEGIN			
			EXEC [ORD_CartProduct_SP_PrtMove_U]	
				@move_crt_idx = @crt_idx,
				@client_id = @client_id
		END
		
		
		-- 처리 (등록) : 등록 상품이 없는 경우
		IF NOT EXISTS (SELECT * FROM ORD_CartProduct WHERE 
				crt_idx = @crt_idx and prt_id = @prt_id and opt_idx = @opt_idx)

		BEGIN

			INSERT INTO ORD_CartProduct
			(
				crt_idx,
				prt_id,
				opt_idx,
				qty_it,
				state_cd,
				ord_id
			)
			VALUES
			(
				@crt_idx,
				@prt_id,
				@opt_idx,
				@qty_it,
				@state_cd,
				@ord_id
			)
		END
		-- 처리 (수정) 등록 상품이 있는 경우
		ELSE
		BEGIN
			---- 처리 (수정) : 갯수
			EXEC [ORD_CartProduct_SP_U]
					@crt_idx = @crt_idx, 
					@prt_id = @prt_id, 
					@opt_idx = @opt_idx, 
					@qty_it = @qty_it,
					@state_cd = @state_cd
		END
		
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
	exec [ORD_CartProduct_SP_C]	@crt_idx=1, @prt_id=1, @opt_idx=3 
	exec [ORD_CartProduct_SP_C]	@crt_idx=1, @prt_id=1, @opt_idx=4
	exec [ORD_CartProduct_SP_C]	@crt_idx=1, @prt_id=1, @opt_idx=11
	
	-- 클라이언트로 등록
	exec [ORD_CartProduct_SP_C]	@prt_id=1, @opt_idx=3, @client_id='CC6'
	
	-- 회원으로 등록
	exec [ORD_CartProduct_SP_C]	@prt_id=1, @opt_idx=2, @meb_idx=5, @qty_it=10
	
	-- 첫로그인 등록
	exec [ORD_CartProduct_SP_C]	@prt_id=1, @opt_idx=5, @meb_idx=5, @client_id='CC6'
	
	select * from ORD_CartProduct
	select * from ORD_Cart
	
	
*/



GO
