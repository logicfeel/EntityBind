USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[LOG_Visit_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[LOG_Visit_SP_C]

	@client_id					varchar(20)		= '',
	@ip							varchar(30)		= '',
	@referer					varchar(200)	= '',
	@url						varchar(200)	= '',		-- TODO:: 확장시 사용예정
	@agent						varchar(200)	= '',
	@meb_idx					int				= NULL,
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		
	/* ----- DECLARE LOCAL ---- */
	DECLARE @vst_idx			int				= 0;
	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 조회 : 상점별 주문합계금액
			SELECT @vst_idx = isnull(a.vst_idx, 0)
			FROM LOG_Visit a
			WHERE 1 =1
				and a.client_id = @client_id
				and getdate() between a.create_dt and DATEADD(day, 1, a.create_dt )
		
		
		/*******************************************************/
		-- 처리 (등록)
		IF @vst_idx = 0
		BEGIN
			INSERT INTO LOG_Visit
			(
				client_id,
				ip,
				referer,
				agent,
				meb_idx,
				create_dt
			)
			VALUES
			(
				@client_id,
				@ip,
				@referer,
				@agent,
				@meb_idx,
				GETDATE()
			)
		END
		-- 처리 (수정) : 카운터 추가
		ELSE
		BEGIN
			UPDATE LOG_Visit 
			SET
				view_it		= view_it + 1,
				meb_idx		= @meb_idx
			WHERE
				vst_idx = @vst_idx

			-- 세부 방문 정보 등록
			EXEC [LOG_VisitInfo_SP_C] 
					@vst_idx = @vst_idx,
					@visitUrl = @url
				
		END

		
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
exec [LOG_Visit_SP_C]


select * from LOG_Visit
	
*/



GO
