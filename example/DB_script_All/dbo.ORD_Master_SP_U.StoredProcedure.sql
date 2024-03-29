USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ORD_Master_SP_U]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	** 주문 관련 주의 사항 !!
	금액, 포인트 관련 수치 직접 수정 불가 : _mn, _it
	(생성시 값 유지)
*/
-- ==============================================================
CREATE PROC [dbo].[ORD_Master_SP_U]

	@ord_id						varchar(14),				-- PK
	@order_mn					int				= NULL,
	@orderName					nvarchar(10)	= NULL,
	@email						varchar(100)	= NULL,
	@orderTel					varchar(15)		= NULL,
	@meb_idx					int				= NULL,
	@memo						nvarchar(200)	= NULL,
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
		IF LEN(@ord_id) <= 0 or @ord_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @ord_id ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM ORD_Master WHERE ord_id = @ord_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : ORD_Master ', 16, @RESULT);
		END	


		/*******************************************************/
		-- 처리 (수정)
		UPDATE ORD_Master 
		SET
			orderName = CASE WHEN @orderName IS NULL THEN orderName ELSE @orderName END,
			email = CASE WHEN @email IS NULL THEN email ELSE @email END,
			orderTel = CASE WHEN @orderTel IS NULL THEN orderTel ELSE @orderTel END,
			meb_idx = CASE WHEN @meb_idx IS NULL THEN meb_idx ELSE @meb_idx END,
			memo = CASE WHEN @memo IS NULL THEN memo ELSE @memo END
		WHERE
			ord_id = @ord_id
		
		
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
	exec [ORD_Base_SP_U] @ord_id='20200108165429'
	exec [ORD_Base_SP_U] @ord_id='20200108165429', @orderName='주문자(수정)'
	
	select * from ORD_Master
	
*/



GO
