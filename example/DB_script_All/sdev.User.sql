USE [jns9778]
GO
/****** Object:  User [sdev]    Script Date: 2021-11-25 오후 3:58:39 ******/
CREATE USER [sdev] FOR LOGIN [sdev] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [sdev]
GO
