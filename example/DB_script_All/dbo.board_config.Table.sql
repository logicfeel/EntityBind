USE [jns9778]
GO
/****** Object:  Table [dbo].[board_config]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[board_config](
	[bc_id] [int] NOT NULL,
	[bc_name] [varchar](50) NOT NULL,
	[bc_isopen] [tinyint] NOT NULL,
	[bc_desc] [text] NULL,
	[bc_other] [varchar](15) NULL,
	[bc_top] [varchar](40) NULL,
	[bc_bottom] [varchar](40) NULL,
	[bc_listright] [tinyint] NULL,
	[bc_viewright] [tinyint] NULL,
	[bc_writeright] [tinyint] NULL,
	[bc_pdsright] [tinyint] NULL,
	[bc_writeday] [varchar](12) NULL,
	[bc_createadmin] [varchar](12) NULL,
PRIMARY KEY CLUSTERED 
(
	[bc_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT ('') FOR [bc_name]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT ('0') FOR [bc_isopen]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_other]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_top]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_bottom]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_listright]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_viewright]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_writeright]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_pdsright]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_writeday]
GO
ALTER TABLE [dbo].[board_config] ADD  DEFAULT (NULL) FOR [bc_createadmin]
GO
