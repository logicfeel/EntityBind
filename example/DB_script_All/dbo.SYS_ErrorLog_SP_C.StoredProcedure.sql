USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[SYS_ErrorLog_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[SYS_ErrorLog_SP_C]

	@nName						nvarchar(128)	= '',
	@msgPrint_yn				char(1)			= 'Y',
	@msgSave_yn					char(1)			= 'N'
	
AS

BEGIN
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;

	
	/* ----- DECLARE LOCAL ---- */
	DECLARE @SAVE				char(1)			= 'S' --S:저장, 기타:저장안함
	DECLARE @errType			char(1)			= 'E'
	DECLARE @message			nvarchar(1000)

		
	/*******************************************************/
	-- 에러 출력
    IF @msgPrint_yn = 'Y'
    BEGIN
		PRINT '번호: '		+ CONVERT(varchar(50), ERROR_NUMBER())
		PRINT '심각도: '	+ CONVERT(varchar(5), ERROR_SEVERITY())
		PRINT '상태: '		+ CONVERT(varchar(5), ERROR_STATE()) 
		PRINT '프로시저: '	+ ISNULL(ERROR_PROCEDURE(), '-') 
		PRINT '줄: '		+ CONVERT(varchar(5), ERROR_LINE())
		PRINT '메세지: '	+ ERROR_MESSAGE()
    END


	/*******************************************************/
	-- 	최상위 트랜젝션만 저장함
	IF @msgSave_yn = 'Y' AND @SAVE = 'S'
	BEGIN
		-- 50000 미만은 시스템메세지
		IF ERROR_NUMBER() < 50000	
			SET @errType = 'S'
		ELSE
			SET @errType = 'U'		
		
		
		-- 시스템 메세지 아니고  & 로그 기록
		IF @errType <> 'S' OR @msgSave_yn = 'Y'
			SET @message = CAST(ERROR_MESSAGE() as nvarchar(1000))

		
		-- 에러 저장
		INSERT INTO SYS_ErrorLog
		(
			type_cd, 
			errName, 
			number_cd, 
			severity, 
			state_cd, 
			line, 
			storeProcedure, 
			[message]
		)
		VALUES
		( 
			@errType, 
			@nName, 
			ERROR_NUMBER(),
			ERROR_SEVERITY(),
			ERROR_STATE(),
			ERROR_LINE(),
			ERROR_PROCEDURE(),
			@message
		)
	END


	/*******************************************************/
	-- 리턴	
	RETURN @RESULT	
END

-- ##############################################################
-- #### TEST AREA
/*
exec [STO_Base_SP_C]	99		

select * from SYS_ErrorLog

delete from SYS_ErrorLog	-- 초기화
*/



GO
