USE [jns9778]
GO
/****** Object:  Table [dbo].[member_level]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[member_level](
	[l_id] [int] NOT NULL,
	[level] [tinyint] NOT NULL,
	[level_point] [int] NULL,
	[write_day] [varchar](12) NULL,
	[use_yn] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[l_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[member_level] ADD  DEFAULT ('1') FOR [level]
GO
ALTER TABLE [dbo].[member_level] ADD  DEFAULT (NULL) FOR [level_point]
GO
ALTER TABLE [dbo].[member_level] ADD  DEFAULT (NULL) FOR [write_day]
GO
ALTER TABLE [dbo].[member_level] ADD  DEFAULT ('Y') FOR [use_yn]
GO
