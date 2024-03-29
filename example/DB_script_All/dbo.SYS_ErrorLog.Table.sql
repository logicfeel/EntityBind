USE [jns9778]
GO
/****** Object:  Table [dbo].[SYS_ErrorLog]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SYS_ErrorLog](
	[err_idx] [int] IDENTITY(1,1) NOT NULL,
	[errName] [nvarchar](128) NOT NULL,
	[type_cd] [char](1) NULL,
	[severity] [int] NULL,
	[state_cd] [int] NULL,
	[storeProcedure] [varchar](100) NULL,
	[line] [int] NULL,
	[number_cd] [int] NULL,
	[message] [varchar](500) NULL,
	[create_dt] [smalldatetime] NOT NULL,
 CONSTRAINT [PK__SYS_Erro__B4A538B13E082B48] PRIMARY KEY CLUSTERED 
(
	[err_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[SYS_ErrorLog] ADD  CONSTRAINT [DF__SYS_Error__creat__3C1FE2D6]  DEFAULT (getdate()) FOR [create_dt]
GO
