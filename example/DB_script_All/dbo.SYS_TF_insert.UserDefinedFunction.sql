USE [jns9778]
GO
/****** Object:  UserDefinedFunction [dbo].[SYS_TF_insert]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[SYS_TF_insert]
(	
	@err_idx int
)
RETURNS TABLE 
AS
RETURN 
(
	SELECT * from SYS_ErrorLog where err_idx > @err_idx
)

GO
