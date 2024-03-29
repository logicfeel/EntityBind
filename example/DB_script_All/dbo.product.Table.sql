USE [jns9778]
GO
/****** Object:  Table [dbo].[product]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[p_id] [int] NOT NULL,
	[p_category_id] [int] NOT NULL,
	[p_name] [varchar](100) NOT NULL,
	[p_content] [text] NULL,
	[p_compcode] [tinyint] NULL,
	[p_price] [int] NOT NULL,
	[p_price_sale] [int] NULL,
	[p_point] [tinyint] NULL,
	[p_total] [int] NULL,
	[p_enter] [int] NULL,
	[p_writeday] [varchar](12) NULL,
	[p_startday] [varchar](12) NULL,
	[p_endday] [varchar](12) NULL,
	[p_cost] [int] NULL,
	[p_display] [tinyint] NULL,
	[p_recom_month] [tinyint] NULL,
	[p_empty] [char](1) NOT NULL,
	[p_largesize] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[p_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT ('0') FOR [p_category_id]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT ('') FOR [p_name]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_compcode]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT ('0') FOR [p_price]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_price_sale]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_point]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_total]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_enter]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_writeday]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_startday]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_endday]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_cost]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_display]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT (NULL) FOR [p_recom_month]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT ('N') FOR [p_empty]
GO
ALTER TABLE [dbo].[product] ADD  DEFAULT ('N') FOR [p_largesize]
GO
