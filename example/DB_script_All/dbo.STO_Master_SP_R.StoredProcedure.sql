USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[STO_Master_SP_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[STO_Master_SP_R]

	@sto_id						varchar(6),					-- PK
	@xml_yn						char(1)			= 'N',		-- 출력방식
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE LOCAL ---- */
	DECLARE @RESULT				int				= 0;
	
	
	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@sto_id) <= 0 OR @sto_id IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @sto_id ', 16, @RESULT);
		END

		
		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM STO_Master WHERE sto_id = @sto_id)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : STO_Master ', 16, @RESULT);
		END

		
		-- 초기화 (임시테이블) : 삭제
		IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
			DROP TABLE #TempTable


		/*******************************************************/
		-- 처리 (조회)
		SELECT * 
		INTO #TempTable
		FROM STO_Master
		WHERE sto_id = @sto_id
		
	
		/*******************************************************/
		-- 결과 (출력)
		IF @xml_yn = 'Y' 
			SELECT * FROM #TempTable
			FOR XML PATH('row'), TYPE
		ELSE
			SELECT * FROM #TempTable
		
		
		RETURN @RESULT
		
	END TRY
	BEGIN CATCH	/***********************************************/
		/* ----- DECLARE CATCH ---- */
		DECLARE @procName		nvarchar(128)	= OBJECT_NAME(@@PROCID);
		DECLARE @errorState		int				= ERROR_STATE();
        
        /* ----- ERROR PROCESS ---- */
		EXEC [SYS_ErrorLog_SP_C] @procName, @msgPrint_yn, @msgSave_yn;
		RETURN -@errorState;
	END CATCH
	SET NOCOUNT OFF	
END

-- ##############################################################
-- #### TEST AREA
/*
	exec [STO_Master_SP_R] @sto_id='S00002'
	
	select * from sto_master
	
*/



GO
