USE [jns9778]
GO
/****** Object:  StoredProcedure [dbo].[ChangeAllObjOwner]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ChangeAllObjOwner] (
  @oldowner sysname,
  @newowner sysname
)
AS
DECLARE @objname sysname
SET NOCOUNT ON

--check that the @oldowner exists in the database
IF USER_ID(@oldowner) IS NULL
  BEGIN
    RAISERROR ('The @oldowner passed does not exist in the database', 16, 1)
    RETURN
  END
--check that the @newowner exists in the database
IF USER_ID(@newowner) IS NULL
  BEGIN
    RAISERROR ('The @newowner passed does not exist in the database', 16, 1)
    RETURN
  END

DECLARE owner_cursor CURSOR FOR 
  SELECT name FROM sysobjects WHERE uid = USER_ID(@oldowner)

OPEN owner_cursor
FETCH NEXT FROM owner_cursor INTO @objname
WHILE (@@fetch_status <> -1)
BEGIN
  SET @objname = @oldowner + '.' + @objname
  EXEC sp_changeobjectowner @objname, @newowner
  FETCH NEXT FROM owner_cursor INTO @objname
END

CLOSE owner_cursor
DEALLOCATE owner_cursor
GO
