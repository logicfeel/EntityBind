USE [jns9778]
GO
/****** Object:  Table [dbo].[product_price]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_price](
	[idx] [int] NOT NULL,
	[p_id] [int] NOT NULL,
	[order_list] [tinyint] NULL,
	[p_during] [tinyint] NOT NULL,
	[p_price] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[product_price] ADD  DEFAULT ('0') FOR [p_id]
GO
ALTER TABLE [dbo].[product_price] ADD  DEFAULT (NULL) FOR [order_list]
GO
ALTER TABLE [dbo].[product_price] ADD  DEFAULT ('0') FOR [p_during]
GO
ALTER TABLE [dbo].[product_price] ADD  DEFAULT ('0') FOR [p_price]
GO
