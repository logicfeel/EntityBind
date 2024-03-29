USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[SYS_Image_SP_C]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE PROC [dbo].[SYS_Image_SP_C]

	@position_cd				varchar(10),
	@pos_idx					int				= NULL,
	@pos_id						varchar(20)		= NULL,
	@sub_idx					int				= NULL,

	@img_idx					int				= 0 OUTPUT,	--
	@file_idx					int				= 0 OUTPUT,	--

	@msgSave_yn					char(1)			= 'Y',		-- 에러저장
	@msgPrint_yn				char(1)			= 'Y'		-- 에러출력

AS

BEGIN
	SET NOCOUNT ON
	
	/* ----- DECLARE GLOBAL --- */
	DECLARE @RESULT				int				= 0;
		
	/* ----- DECLARE LOCAL ---- */
--	DECLARE @img_idx			int				= 0;
--	DECLARE @file_idx			int				= 0;
	
	/* ----- TRANSACTION ------ */
	DECLARE @tranCounter		int				= @@TRANCOUNT
    IF @tranCounter > 0  
        SAVE TRANSACTION ProcedureSave
    ELSE  
        BEGIN TRANSACTION


	BEGIN TRY
		/*******************************************************/
		-- 검사 (필수값)
		IF LEN(@position_cd) <= 0 OR @position_cd IS NULL
		BEGIN
			SET @RESULT = 102
			RAISERROR ('[오류] 필수값 없음 : @position_cd ', 16, @RESULT);
		END	

		SELECT @img_idx = isnull(img_idx, 0)
		FROM SYS_Image a
		WHERE 1 =1
			and a.position_cd = @position_cd
			and (@pos_idx IS NULL or a.pos_idx = @pos_idx)
			and (@pos_id IS NULL or a.pos_id = @pos_id)
			and (@sub_idx IS NULL or a.sub_idx = @sub_idx)
		

		/*******************************************************/
		-- 처리 (등록)
		IF @img_idx = 0 OR @img_idx IS NULL
		BEGIN
			INSERT INTO SYS_Image
			(
				position_cd,
				pos_idx,
				pos_id,
				sub_idx
			)
			VALUES
			(
				@position_cd,
				@pos_idx,
				@pos_id,
				@sub_idx
			)
			-- idx 얻기
			SET @img_idx = @@IDENTITY

		END

		SELECT @file_idx = (isnull(Max(a.file_idx), 0) + 1) FROM SYS_ImageFile a WHERE a.img_idx = @img_idx

		-- 처리 (등록)
		INSERT INTO SYS_ImageFile
		(
			img_idx,
			file_idx
		)
		VALUES
		(
			@img_idx,
			@file_idx
		)
		
		/*******************************************************/
		-- 결과 (커밋)
		/* ----- TRANSACTION ------ */
		IF @tranCounter = 0
			COMMIT TRANSACTION

		SET @RESULT = @img_idx						-- file_idx 리턴
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
exec [SYS_Image_SP_C] @position_cd='PRT'


exec [SYS_Image_SP_C] @position_cd='PRT', @pos_idx=1

DECLARE @res				int	= 0;
DECLARE @res2				int	= 0;
exec [SYS_Image_SP_C] @position_cd='PRT', @pos_idx=5, @img_idx=@res OUTPUT, @file_idx=@res2 OUTPUT
print @res
print @res2


DECLARE @res				int	= 0;
DECLARE @res2				int	= 0;
exec [SYS_Image_SP_C] @position_cd='Product', @pos_idx=10, @img_idx=@res OUTPUT, @file_idx=@res2 OUTPUT
print @res
print @res2


DECLARE @res				int	= 0;
DECLARE @res2				int	= 0;
exec [SYS_Image_SP_C] @position_cd='Product', @pos_idx=11, @img_idx=@res OUTPUT, @file_idx=@res2 OUTPUT
print @res
print @res2


exec [SYS_Image_SP_C] @position_cd='Product', @pos_idx=8

exec [SYS_Image_SP_C] @position_cd='Product', @pos_idx=9

select * from SYS_ImageFile
select * from SYS_Image


delete 	SYS_ImageFile
delete 	SYS_Image
*/



GO
