USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[PRT_Rental_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[PRT_Rental_SP_C]
	
	@stc_add					int,						-- 추가할 갯수
	@prt_id						int,
	@identifier					varchar(20)		= '',
	@state_cd					char(1)			= 'R',		-- 대기(최기값)
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;


	/* ----- DECLARE LOCAL ---- */
	DECLARE @LIMIT_MAX			int				= 50			-- 최대생성갯수
	DECLARE @stc_cnt			int				= 0				-- idx 증가값
	DECLARE @stc_max			int

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
		IF @stc_add <= 0 OR @stc_add IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @stc_add ', 16, @RESULT);
		END		

		
		-- 검사 (중복) : 한개 생성시 유효한 기능!!
		IF LEN(@identifier) > 0 
			AND EXISTS(SELECT * FROM PRT_Rental WHERE identifier = @identifier AND prt_id = @prt_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 중복 : prt_id 기준 @identifier ', 16, @RESULT);				
		END		


		-- 검사 (데이터) : 분리된 모듈[컴포넌트]
		--IF EXISTS(SELECT * FROM PRT_Rental WHERE prt_id = @prt_id AND stc_cnt >= @stc_max)
		--BEGIN
		--	RAISERROR ('[오류] 최대값 미만 : @stc_max ', 16, 1);				
		--END
		
		
		-- 조회 (stc_cnt MAX)
		SELECT @stc_cnt = ISNULL(MAX(stc_cnt), 0) FROM PRT_Rental WHERE prt_id = @prt_id


		-- 검사 (제한 카운터)
--		IF (@stc_max - @stc_cnt) > @LIMIT_MAX
		IF @stc_add > @LIMIT_MAX
		BEGIN
			SET @RESULT = 211
			RAISERROR ('[오류] 1회 등록 제한 : @COUNT_LIMIT ', 16, @RESULT);				
		END
		

		/*******************************************************/
		-- 처리 (설정) : stc_cnt의 MAX 값
		SET @stc_max = @stc_cnt + @stc_add

		
		-- 처리 (등록) MAX - 생성된 갯수
		WHILE (@stc_cnt < @stc_max)
		BEGIN
			SET @stc_cnt = @stc_cnt + 1;
			INSERT INTO PRT_Rental
			(
				prt_id,
				stc_cnt,
				identifier,
				state_cd
			)
			VALUES
			(
				@prt_id,
				@stc_cnt,
				@identifier,
				@state_cd
			)
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
exec [PRT_Rental_SP_C] @prt_id=1, @stc_max=13

select * from prt_m_base
select * from PRT_Rental

print @@TRANCOUNT
	
*/



GO
