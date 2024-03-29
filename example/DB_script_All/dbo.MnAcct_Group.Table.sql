USE [jns9778]
GO
/****** Object:  Table [dbo].[MnAcct_Group]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MnAcct_Group](
	[group_ac_idx] [int] IDENTITY(1,1) NOT NULL,
	[groupName] [varchar](50) NOT NULL,
	[memo] [varchar](200) NULL,
	[create_dt] [datetime] NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[using_yn] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[group_ac_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MnAcct_Group] ADD  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[MnAcct_Group] ADD  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[MnAcct_Group] ADD  DEFAULT ('Y') FOR [using_yn]
GO
