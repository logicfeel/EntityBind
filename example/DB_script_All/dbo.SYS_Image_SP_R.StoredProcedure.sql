USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[SYS_Image_SP_R]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[SYS_Image_SP_R]

	@img_idx					int				= NULL,		-- PK
	@file_idx					int				= NULL,		-- PK
	@position_cd				varchar(10)		= NULL,
	@pos_idx					int				= NULL,
	@pos_id						varchar(20)		= NULL,
	@sub_idx					int				= NULL,

	@xml_yn						char(1)			= 'N',		-- 출력방식
	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;


	BEGIN TRY
		/*******************************************************/
		-- 키 조회
		IF @position_cd IS NOT NULL 
		BEGIN
			SELECT top(1)
				@img_idx = a.img_idx,
				@file_idx = a.file_idx 
			FROM SYS_ImageFile a 
			WHERE a.img_idx = (select aa.img_idx from SYS_Image aa 
				where 1=1
				and aa.position_cd = @position_cd
				and (@pos_idx IS NULL or aa.pos_idx = @pos_idx)
				and (@pos_id IS NULL or aa.pos_id = @pos_id)
				and (@sub_idx IS NULL or aa.sub_idx = @sub_idx)
			)
		END

		-- 검사 (필수값)
		IF @img_idx <= 0 OR @img_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @img_idx ', 16, @RESULT);
		END

		IF @file_idx <= 0 OR @file_idx IS NULL
		BEGIN
			SET @RESULT = 101
			RAISERROR ('[오류] 필수값 없음 : @file_idx ', 16, @RESULT);
		END


		-- 검사 (데이터)
		IF NOT EXISTS(SELECT * FROM SYS_ImageFile WHERE img_idx = @img_idx and file_idx = @file_idx)
		BEGIN
			SET @RESULT = 201
			RAISERROR ('[오류] 데이터 없음 : SYS_ImageFile ', 16, @RESULT);
		END	



		/*******************************************************/
		-- 처리 (조회)
		SELECT * 
		INTO #TempTable
		FROM SYS_ImageFile
		WHERE img_idx = @img_idx and file_idx = @file_idx
		
		
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
	
	exec [SYS_Image_SP_R] @img_idx=13, @file_idx=1

	exec [SYS_Image_SP_R] @position_cd='PRT', @pos_idx=1

	select * from SYS_Image
	select * from SYS_ImageFile
	
	
*/



GO
