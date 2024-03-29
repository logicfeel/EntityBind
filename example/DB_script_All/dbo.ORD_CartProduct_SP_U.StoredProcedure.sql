USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_CartProduct_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	edit_crt_idx 를 입력하면 키를 수정한다.
*/
-- ==============================================================
CREATE PROC [dbo].[ORD_CartProduct_SP_U]

	@crt_idx					int,						-- PK
	@prt_id						int,						-- PK
	@opt_idx					int,						-- PK
	@qty_it						tinyint			= NULL,
	@state_cd					char(1)			= NULL,
	@ord_id						varchar(14)		= NULL,
	@del_yn						char(1)			= NULL,
	@edit_crt_idx				int				= NULL,
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
		IF @crt_idx <= 0 or @crt_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @crt_idx ', 16, @RESULT);
		END
		IF @prt_id <= 0 or @prt_id IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @prt_id ', 16, @RESULT);
		END
		IF @opt_idx <= 0 or @opt_idx IS NULL
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @opt_idx ', 16, @RESULT);
		END		


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM ORD_CartProduct WHERE 
				crt_idx = @crt_idx and prt_id = @prt_id and opt_idx = @opt_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_CartProduct ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정)
		UPDATE ORD_CartProduct 
		SET
			qty_it = CASE WHEN @qty_it IS NULL THEN qty_it ELSE @qty_it END,
			state_cd = CASE WHEN @state_cd IS NULL THEN state_cd ELSE @state_cd END,
			ord_id = CASE WHEN @ord_id IS NULL THEN ord_id ELSE @ord_id END,
			del_yn = CASE WHEN @del_yn IS NULL THEN del_yn ELSE @del_yn END
		WHERE
			crt_idx = @crt_idx and prt_id = @prt_id and opt_idx = @opt_idx
		
		
		-- 처리 (키수정) : 키변경에 따른 성능 이슈발생 가능성으로 분리함
		IF @edit_crt_idx IS NOT NULL
			UPDATE ORD_CartProduct 
			SET	crt_idx = @edit_crt_idx
			WHERE crt_idx = @crt_idx and prt_id = @prt_id and opt_idx = @opt_idx;

		
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
	exec [ORD_CartProduct_SP_U] @crt_idx=1, @prt_id=1, @opt_idx=2
	exec [ORD_CartProduct_SP_U] @crt_idx=1, @prt_id=1, @opt_idx=2, @qty_it=3
	exec [ORD_CartProduct_SP_U] @crt_idx=1, @prt_id=1, @opt_idx=2, @edit_crt_idx=2

-- 오류 : 변경할 키가 없음	
	exec [ORD_CartProduct_SP_U] @crt_idx=1, @prt_id=1, @opt_idx=4, @edit_crt_idx=6
	
	select * from ORD_Cart
	select * from ORD_CartProduct
	
*/



GO
