USE [jns9778]
GO
/****** Object:  Table [dbo].[cart]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart](
	[cart_id] [int] NOT NULL,
	[p_id] [int] NOT NULL,
	[order_id] [varchar](14) NULL,
	[m_no] [int] NOT NULL,
	[p_during] [tinyint] NULL,
	[p_price] [int] NULL,
	[cart_op] [tinyint] NULL,
	[color_option] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[cart_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[cart] ADD  DEFAULT ('0') FOR [p_id]
GO
ALTER TABLE [dbo].[cart] ADD  DEFAULT (NULL) FOR [order_id]
GO
ALTER TABLE [dbo].[cart] ADD  DEFAULT ('0') FOR [m_no]
GO
ALTER TABLE [dbo].[cart] ADD  DEFAULT (NULL) FOR [p_during]
GO
ALTER TABLE [dbo].[cart] ADD  DEFAULT (NULL) FOR [p_price]
GO
ALTER TABLE [dbo].[cart] ADD  DEFAULT (NULL) FOR [cart_op]
GO
ALTER TABLE [dbo].[cart] ADD  DEFAULT (NULL) FOR [color_option]
GO
