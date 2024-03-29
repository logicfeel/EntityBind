USE [jns9778]
GO
/****** Object:  Table [dbo].[board]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[board](
	[num] [int] NOT NULL,
	[bc_id] [int] NOT NULL,
	[name] [varchar](10) NOT NULL,
	[m_id] [varchar](14) NOT NULL,
	[passwd] [varchar](30) NOT NULL,
	[email] [varchar](30) NULL,
	[homepage] [varchar](50) NULL,
	[subject] [varchar](80) NOT NULL,
	[writedate] [varchar](12) NOT NULL,
	[content] [text] NOT NULL,
	[linkdata] [varchar](100) NOT NULL,
	[readcount] [int] NOT NULL,
	[reply] [int] NOT NULL,
	[replystep] [int] NOT NULL,
	[replylevel] [int] NOT NULL,
	[smallnum] [int] NOT NULL,
	[smallname] [varchar](10) NOT NULL,
	[smallcontent] [text] NOT NULL,
	[smallpasswd] [varchar](30) NOT NULL,
	[smallcount] [int] NOT NULL,
	[notice_add] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[num] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('0') FOR [bc_id]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('') FOR [name]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('') FOR [m_id]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('') FOR [passwd]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT (NULL) FOR [email]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT (NULL) FOR [homepage]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('') FOR [subject]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('') FOR [writedate]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('') FOR [linkdata]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('0') FOR [readcount]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('0') FOR [reply]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('0') FOR [replystep]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('0') FOR [replylevel]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('0') FOR [smallnum]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('') FOR [smallname]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('') FOR [smallpasswd]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT ('0') FOR [smallcount]
GO
ALTER TABLE [dbo].[board] ADD  DEFAULT (NULL) FOR [notice_add]
GO
