USE [jns9778]
GO
/****** Object:  Table [dbo].[board_small]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[board_small](
	[smallnum] [int] NOT NULL,
	[num] [int] NOT NULL,
	[smallname] [varchar](10) NOT NULL,
	[smallcontent] [text] NOT NULL,
	[smallpasswd] [varchar](50) NOT NULL,
	[remoteaddr] [varchar](15) NOT NULL,
	[writedate] [varchar](12) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[smallnum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[board_small] ADD  DEFAULT ('0') FOR [num]
GO
ALTER TABLE [dbo].[board_small] ADD  DEFAULT ('') FOR [smallname]
GO
ALTER TABLE [dbo].[board_small] ADD  DEFAULT ('') FOR [smallpasswd]
GO
ALTER TABLE [dbo].[board_small] ADD  DEFAULT ('') FOR [remoteaddr]
GO
ALTER TABLE [dbo].[board_small] ADD  DEFAULT ('') FOR [writedate]
GO
