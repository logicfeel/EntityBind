USE [jns9778]
GO
/****** Object:  Table [dbo].[member_point]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[member_point](
	[idx] [int] NOT NULL,
	[m_id] [varchar](14) NOT NULL,
	[modi_day] [varchar](12) NULL,
	[m_level] [tinyint] NOT NULL,
	[m_point_all] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[member_point] ADD  DEFAULT ('') FOR [m_id]
GO
ALTER TABLE [dbo].[member_point] ADD  DEFAULT (NULL) FOR [modi_day]
GO
ALTER TABLE [dbo].[member_point] ADD  DEFAULT ('1') FOR [m_level]
GO
ALTER TABLE [dbo].[member_point] ADD  DEFAULT (NULL) FOR [m_point_all]
GO
