USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[TF_Multi]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[TF_Multi]
(
	-- Add the parameters for the function here
	@num varchar(10)
  , @len int
)
RETURNS 
@Table_TF_multi TABLE 
(
	-- Add the column definitions for the TABLE variable here
	num2 varchar(10)
  , len2 int
)
AS
BEGIN
	 insert @Table_TF_multi(num2, len2) values('aa',2)
	
	RETURN 
END
GO
