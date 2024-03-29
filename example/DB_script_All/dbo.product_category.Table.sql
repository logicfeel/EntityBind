USE [jns9778]
GO
/****** Object:  Table [dbo].[product_category]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_category](
	[p_category_id] [int] NOT NULL,
	[p_category_1] [tinyint] NULL,
	[p_category_2] [tinyint] NULL,
	[p_category_name] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[p_category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[product_category] ADD  DEFAULT (NULL) FOR [p_category_1]
GO
ALTER TABLE [dbo].[product_category] ADD  DEFAULT (NULL) FOR [p_category_2]
GO
ALTER TABLE [dbo].[product_category] ADD  DEFAULT (NULL) FOR [p_category_name]
GO
