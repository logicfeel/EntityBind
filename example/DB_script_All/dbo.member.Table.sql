USE [jns9778]
GO
/****** Object:  Table [dbo].[member]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[member](
	[m_no] [int] NOT NULL,
	[m_id] [varchar](14) NOT NULL,
	[m_writer_id] [varchar](24) NULL,
	[m_pass] [varchar](14) NOT NULL,
	[m_name] [varchar](20) NOT NULL,
	[m_zipcode] [varchar](7) NULL,
	[m_addr1] [varchar](80) NULL,
	[m_addr2] [varchar](40) NULL,
	[m_jumin1] [varchar](6) NOT NULL,
	[m_jumin2] [varchar](60) NOT NULL,
	[m_join_day] [varchar](12) NULL,
	[m_modi_day] [varchar](12) NULL,
	[m_email] [varchar](60) NULL,
	[m_home] [varchar](60) NULL,
	[m_tel] [varchar](15) NULL,
	[m_hp] [varchar](15) NULL,
	[m_spon_id_cnt] [tinyint] NOT NULL,
	[m_level_op] [char](1) NOT NULL,
	[m_level] [tinyint] NOT NULL,
	[m_point] [int] NULL,
	[m_point_level] [int] NOT NULL,
	[m_join_method] [tinyint] NOT NULL,
	[m_method_cont] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[m_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('') FOR [m_id]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_writer_id]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('') FOR [m_pass]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('') FOR [m_name]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_zipcode]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_addr1]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_addr2]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('') FOR [m_jumin1]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('') FOR [m_jumin2]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_join_day]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_modi_day]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_email]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_home]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_tel]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_hp]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('0') FOR [m_spon_id_cnt]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('U') FOR [m_level_op]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('1') FOR [m_level]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT (NULL) FOR [m_point]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('0') FOR [m_point_level]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('0') FOR [m_join_method]
GO
ALTER TABLE [dbo].[member] ADD  DEFAULT ('') FOR [m_method_cont]
GO
