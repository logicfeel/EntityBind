USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[POT_Master_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
	@method_cd
		+ [F]ix	: 고정값
		+ [P]ersent : 퍼센트
		+ [E]ach : 개별 지정 (개별 값을 설정)
*/
-- ==============================================================
CREATE PROC [dbo].[POT_Master_SP_C]

	@identifier					varchar(20),
	@pointName					nvarchar(20),
	@method_cd					char(1),
	@point_it					int				= 0,
	@percent_it					int				= 0,
	@use_yn						char(1)			= 'Y',
	@contents					nvarchar(100)	= '',
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
		IF LEN(@identifier) <= 0 OR @identifier IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @identifier ', 16, @RESULT);
		END
		IF LEN(@pointName) <= 0 OR @pointName IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @pointName ', 16, @RESULT);
		END
		IF LEN(@method_cd) <= 0 OR @method_cd IS NULL
		BEGIN
			SET @RESULT = 103
			RAISERROR ('[오류] 필수값 없음 : @method_cd ', 16, @RESULT);
		END


		-- 검사 (ident 중복)
		IF LEN(@identifier) > 0 AND EXISTS(SELECT * FROM POT_Master WHERE identifier = @identifier)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 중복 : @identifier ', 16, @RESULT);				
		END


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
		IF @method_cd = 'F' AND @point_it <= 0
		BEGIN
			SET @RESULT = 212
			RAISERROR ('[오류] Fix point 0보다 작음  : @method_cd ', 16, @RESULT);
		END		
		-- 검사 (고정퍼센트, 범위 : 1% ~ 99%)
		IF @method_cd = 'P' AND (@percent_it <= 0 OR @percent_it >= 100)  
		BEGIN
			SET @RESULT = 213
			RAISERROR ('[오류] Percent point 범위 : 1~99  : @method_cd ', 16, @RESULT);
		END		

	
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO POT_Master
		(
			identifier,
			pointName,
			method_cd,
			point_it,
			percent_it,
			use_yn,
			contents
		)
		VALUES
		(
			@identifier,
			@pointName,
			@method_cd,
			@point_it,
			@percent_it,
			@use_yn,
			@contents
		)

		
		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

		SET @RESULT = @@IDENTITY					
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
exec [POT_Base_SP_C] @identifier='AAAA', @pointName='회원가입',
	@method_cd='F', @point_it =50, @percent_it = 10
	
-- ident 중복 오류
exec [POT_Base_SP_C] @identifier='AAAA', @pointName='회원탈퇴',
	@method_cd='F', @point_it =50, @percent_it = 10	

-- 오류 : fix 값 
exec [POT_Base_SP_C] @identifier='AAAA2', @pointName='회원탈퇴',
	@method_cd='F', @point_it =0, @percent_it = 10	

-- 오류 : percent 값 
exec [POT_Base_SP_C] @identifier='AAAA3', @pointName='회원탈퇴',
	@method_cd='P', @point_it =0, @percent_it = 0	

-- 오류 : percent 값 
exec [POT_Base_SP_C] @identifier='AAAA6', @pointName='회원탈퇴',
	@method_cd='E', @point_it=10, @percent_it = 0	


select * from POT_Master
	
*/



GO
