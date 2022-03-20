USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[BOD_FAQ_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[BOD_FAQ_SP_C]

	@question					nvarchar(1000),
	@answer						nvarchar(1000)	= '',
	@typeCode					varchar(5)		= '',
	@rank_it					smallint		= 99,
/*
	// 추가 위치
	// each-meta-extend : 메타의 확장 부분만 반복
	// meta-name : 메타의 명칭
	// data-type : 데이터 타입 변환 (mssql)
	// meta-default : 기본값 (mssql)
	// mssql , oracle, mysql 별로 헬퍼를 관리함

{{#each-meta-extend meta.sp.Create.params }}
	{{meta-val-name columnn}} {{data-type dataType}} {{meta-default default}},
{{/each-meta-extend}}
	
*/

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
		IF LEN(@question) <= 0 OR @question IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @question ', 16, @RESULT);
		END

		
		/*******************************************************/
		-- 처리 (등록)
		INSERT INTO BOD_FAQ
		(
			question, 
			answer,
			typeCode,
			rank_it
/*
	// 추가 위치

{{#each-meta-extend meta.sp.Create.params }}
	, {{columnn}}
{{/each-meta-extend}}
	
*/
		)
		VALUES
		(
			@question,
			@answer,
			@typeCode,
			@rank_it
/*
	// 추가 위치
	
{{#each-meta-extend meta.sp.Create.params }}
	, {{meta-val-name columnn}} 
{{/each-meta-extend}}
	
*/
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
exec [BOD_FAQ_SP_C]	'질문입니다.'

exec [BOD_FAQ_SP_C]	@question='질문입니다.', @answer='답변', @typeCode= 'DD'

select * from bod_faq
select * from bod_faq where typeCode = 'DD'
	
*/



GO
