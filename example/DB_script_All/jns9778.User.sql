USE [jns9778]
GO
/****** Object:  User [jns9778]    Script Date: 2021-11-25 오후 3:58:39 ******/
CREATE USER [jns9778] FOR LOGIN [jns9778] WITH DEFAULT_SCHEMA=[jns9778]
GO
ALTER ROLE [db_owner] ADD MEMBER [jns9778]
GO
