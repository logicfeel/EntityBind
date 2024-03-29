USE [jns9778]
GO
/****** Object:  Table [dbo].[order_list]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_list](
	[order_id] [varchar](14) NOT NULL,
	[p_id] [int] NOT NULL,
	[p_info] [varchar](100) NOT NULL,
	[m_no] [int] NOT NULL,
	[order_day] [varchar](12) NOT NULL,
	[receive_name] [varchar](20) NOT NULL,
	[receive_money] [int] NULL,
	[receive_day] [varchar](8) NULL,
	[delivery_day] [varchar](8) NULL,
	[return_day] [varchar](8) NOT NULL,
	[delivery_state] [tinyint] NULL,
	[delivery_name] [varchar](20) NULL,
	[delivery_zipcode] [varchar](7) NULL,
	[delivery_addr1] [varchar](100) NULL,
	[delivery_addr2] [varchar](40) NULL,
	[delivery_tel] [varchar](15) NULL,
	[delivery_hp] [varchar](15) NULL,
	[comment_1] [varchar](200) NULL,
	[comment_2] [text] NULL,
	[order_op] [tinyint] NULL,
	[result_price] [int] NOT NULL,
	[price_method] [tinyint] NOT NULL,
	[price_percent_str] [varchar](200) NULL,
	[result_price-pt] [int] NOT NULL,
	[use_point] [int] NULL,
	[sum_point] [int] NULL,
	[bill_ok] [char](1) NOT NULL,
	[delivery_chk] [char](1) NOT NULL,
	[delivery_order] [char](2) NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('0') FOR [order_id]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('0') FOR [p_id]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('') FOR [p_info]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('0') FOR [m_no]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('') FOR [order_day]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('') FOR [receive_name]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [receive_money]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [receive_day]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_day]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('') FOR [return_day]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_state]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_name]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_zipcode]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_addr1]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_addr2]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_tel]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_hp]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [comment_1]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [order_op]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('0') FOR [result_price]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('0') FOR [price_method]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [price_percent_str]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('0') FOR [result_price-pt]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('0') FOR [use_point]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('0') FOR [sum_point]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('N') FOR [bill_ok]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT ('N') FOR [delivery_chk]
GO
ALTER TABLE [dbo].[order_list] ADD  DEFAULT (NULL) FOR [delivery_order]
GO
