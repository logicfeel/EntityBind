USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[TF_inlineType]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[TF_inlineType]
(	
	-- Add the parameters for the function here
	@num varchar(10)
  , @len int

)
RETURNS TABLE 
AS
RETURN 
(
	-- Add the SELECT statement with parameter references here
	SELECT 'a' as 'ab', 0 as 'bb'
)
GO
