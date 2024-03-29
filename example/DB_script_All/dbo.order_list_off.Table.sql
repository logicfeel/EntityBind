USE [jns9778]
GO
/****** Object:  Table [dbo].[order_list_off]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_list_off](
	[off_id] [int] NOT NULL,
	[p_id] [int] NOT NULL,
	[m_no] [int] NOT NULL,
	[order_day] [varchar](12) NOT NULL,
	[delivery_day] [varchar](8) NULL,
	[delivery_state] [tinyint] NULL,
	[delivery_name] [varchar](20) NULL,
	[delivery_zipcode] [varchar](7) NULL,
	[delivery_addr1] [varchar](100) NULL,
	[delivery_addr2] [varchar](40) NULL,
	[delivery_tel] [varchar](15) NULL,
	[delivery_hp] [varchar](15) NULL,
	[comment_1] [varchar](200) NULL,
	[order_op] [tinyint] NULL,
	[complete_day] [varchar](8) NULL,
	[complete_name] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[off_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT ('0') FOR [p_id]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT ('0') FOR [m_no]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT ('') FOR [order_day]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [delivery_day]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [delivery_state]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [delivery_name]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [delivery_zipcode]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [delivery_addr1]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [delivery_addr2]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [delivery_tel]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [delivery_hp]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [comment_1]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [order_op]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [complete_day]
GO
ALTER TABLE [dbo].[order_list_off] ADD  DEFAULT (NULL) FOR [complete_name]
GO
