USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[SYS_TF_Str_To_Row]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- ============================================================== 
-- Author		: 김영호
-- Create date	: 2020-01-14
-- Update date	: 
-- Description	: 
/*

*/
-- ==============================================================
CREATE FUNCTION [dbo].[SYS_TF_Str_To_Row]
(
	@items						varchar(8000),
	@rowDelimiter				char(1)			= '|'

)
RETURNS 
@Table_TF TABLE 
(
	idx							int IDENTITY(1,1),
	item						varchar(1000)
)
AS
BEGIN
	/* ----- DECLARE GLOBAL --- */
	
	-- Row
	DECLARE @item				varchar(1000)	= NULL
	DECLARE @index				int	


	-- @items를 문자열을 줄여가면서 설정
	WHILE LEN(@items) > 0
	BEGIN
		
		
		
		IF LEN(@items) > 0
		BEGIN
			SET @index = PATINDEX('%' + @rowDelimiter + '%', @items)		
			IF @index > 0
			BEGIN
				SET @item = SUBSTRING(@items, 0, @index)
				SET @items = SUBSTRING(@items, LEN(@item + @rowDelimiter) + 1, LEN(@items))
			END
			ELSE
			BEGIN
				SET @item = @items
				SET @items = NULL
			END
			
			INSERT INTO @Table_TF (item) VALUES (@item) 
		END
	END
	
	RETURN 
END

-- ##############################################################
-- #### TEST AREA
/*
	select * from SYS_TF_Str_To_Row('12&345&6788|12&345&6&c', '|', '&')
	
*/


GO
