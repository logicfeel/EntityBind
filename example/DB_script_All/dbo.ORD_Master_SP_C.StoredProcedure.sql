USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Master_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[ORD_Master_SP_C]

	@ord_id						varchar(14)		= '' OUTPUT,
	@order_mn					int,
	@orderName					nvarchar(10),
	@state_cd					char(2)			= '',
	@email						varchar(100)	= '',
	@orderTel					varchar(15)		= '',
	@meb_idx					int				= NULL,
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
		IF @order_mn <= 0 OR @order_mn IS NULL 
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @order_mn ', 16, @RESULT);
		END
		IF LEN(@orderName) <= 0 OR @orderName IS NULL 
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @orderName ', 16, @RESULT);
		END


		-- 검사 (유효성)
		IF LEN(@state_cd) > 0 and NOT EXISTS(SELECT * FROM ORD_TF_State('O') WHERE state_cd = @state_cd)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 유효성 : @state_cd ', 16, @RESULT);
		END	
		
		
		/*******************************************************/
		-- 처리 (생성) : 주문번호
		-- TODO:: 함수로 분리
		SELECT @ord_id = (CONVERT(varchar(10),Getdate(),112) 
			+ REPLACE(CONVERT(varchar(8),Getdate(),108),':',''));

		
		-- 처리 (등록)
		INSERT INTO ORD_Master
		(
			ord_id,
			order_mn,
			orderName,
			state_cd,
			email,
			orderTel,
			meb_idx
		)
		VALUES
		(
			@ord_id,
			@order_mn,
			@orderName,
			@state_cd,
			@email,
			@orderTel,
			@meb_idx
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
	exec [ORD_Master_SP_C] @order_mn=100, @orderName='주문자(주문서)'
	
	declare @ord varchar(14)
	exec [ORD_Master_SP_C] @order_mn=200, @orderName='주문자2', @ord_id=@ord OUTPUT
	print @ord
	
	select * from ORD_Master
	
	select * from ORD_Prodct
	
	delete from ORD_Master
	
*/



GO
