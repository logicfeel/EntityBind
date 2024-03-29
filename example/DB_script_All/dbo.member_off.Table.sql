USE [jns9778]
GO
/****** Object:  Table [dbo].[member_off]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[member_off](
	[m_no] [int] NOT NULL,
	[m_name] [varchar](20) NOT NULL,
	[m_zipcode] [varchar](7) NULL,
	[m_addr1] [varchar](80) NULL,
	[m_addr2] [varchar](40) NULL,
	[m_jumin1] [varchar](6) NOT NULL,
	[m_jumin2] [varchar](20) NULL,
	[m_join_day] [varchar](12) NULL,
	[m_modi_day] [varchar](12) NULL,
	[m_email] [varchar](60) NULL,
	[m_home] [varchar](60) NULL,
	[m_tel] [varchar](15) NULL,
	[m_hp] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[m_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT ('') FOR [m_name]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_zipcode]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_addr1]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_addr2]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT ('') FOR [m_jumin1]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_jumin2]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_join_day]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_modi_day]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_email]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_home]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_tel]
GO
ALTER TABLE [dbo].[member_off] ADD  DEFAULT (NULL) FOR [m_hp]
GO
