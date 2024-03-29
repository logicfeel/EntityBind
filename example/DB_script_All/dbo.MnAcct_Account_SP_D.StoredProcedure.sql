USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[MnAcct_Account_SP_D]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- ============================================= 
-- Author		: 김영호
-- Create date	: 2017-08-26
-- Update date	: 
-- Description	: 관리자계정 삭제
/*

*/
-- =============================================
CREATE PROC [dbo].[MnAcct_Account_SP_D]
	@account_idx			int
	
AS

BEGIN

	BEGIN TRY

		-- 1) 유무 검사
		IF NOT EXISTS(SELECT * FROM MnAcct_Account WHERE account_idx = @account_idx)
		BEGIN
			RAISERROR ('[오류] 계정 없음 : @account_idx ', 16, 1);
		END

		
		-- 3) 처리
		UPDATE MnAcct_Account
		SET del_yn = 'Y'
		WHERE account_idx = @account_idx
		
		
		-- 5) 리턴
		RETURN @account_idx
		
	END TRY
	BEGIN CATCH
		EXEC [MnGSys_ErrLog_SP_Base] 'MnAcct', 'Y', 'Y'
		RETURN -1
	END CATCH


END

-- ###################################################
-- ## 테스트 코드
/*
	exec [MnAcct_Account_SP_D]	99		
	
	select * from MnAcct_Account
*/


GO
