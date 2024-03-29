USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[SYS_TF_Str_To_RowColumn]    Script Date: 2021-11-25 오후 3:58:40 ******/
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
CREATE FUNCTION [dbo].[SYS_TF_Str_To_RowColumn]
(
	@items						varchar(8000),
	@rowDelimiter				char(1)			= '|',
	@colDelimiter				char(1)			= '&'
)
RETURNS 
@Table_TF TABLE 
(
	idx							int IDENTITY(1,1),
	item						varchar(1000),
	item1						varchar(200),
	item2						varchar(200),
	item3						varchar(200),
	item4						varchar(200),
	item5						varchar(200)
)
AS
BEGIN
	/* ----- DECLARE GLOBAL --- */
	DECLARE @COLUMN_MAX			int				= 5

	
	-- Row
	DECLARE @item				varchar(1000)	= NULL
	DECLARE @index				int	


	-- Column
	DECLARE @item1				varchar(200)	= NULL
	DECLARE @item2				varchar(200)	= NULL
	DECLARE @item3				varchar(200)	= NULL
	DECLARE @item4				varchar(200)	= NULL
	DECLARE @item5				varchar(200)	= NULL
	

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
			

			;WITH CTE_item AS
			(
				select *
				from SYS_TF_Str_To_Row(@item, @colDelimiter)
			)
			SELECT
				@item1 = (select item from CTE_item a where idx = 1),
				@item2 = (select item from CTE_item a where idx = 2),
				@item3 = (select item from CTE_item a where idx = 3),
				@item4 = (select item from CTE_item a where idx = 4),
				@item5 = (select item from CTE_item a where idx = 5)
			FROM CTE_item 
			
			
			INSERT INTO @Table_TF 
				(item, item1, item2, item3, item4, item5 ) 
			VALUES 
				(@item, @item1, @item2, @item3, @item4, @item5 ) 
		END
	END
	
	RETURN 
END

-- ##############################################################
-- #### TEST AREA
/*
	select * from SYS_TF_Str_To_RowColumn('12&345&6788|12&345&6&c', '|', '&')
	select * from SYS_TF_Str_To_Row('12&345&6788|12&345&6&c', '|')

	select * from SYS_TF_Str_To_RowColumn('12&345&6788', '&', ',') 
	select * from SYS_TF_Str_To_Row('12&345&6788', '&', ',') where idx=1	
*/



GO
