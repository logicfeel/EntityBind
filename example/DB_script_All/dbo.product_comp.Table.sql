USE [jns9778]
GO
/****** Object:  Table [dbo].[product_comp]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_comp](
	[p_compcode] [int] NOT NULL,
	[p_compname] [varchar](50) NULL,
	[p_comp_op] [tinyint] NOT NULL,
	[p_writeday] [varchar](12) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[p_compcode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[product_comp] ADD  DEFAULT (NULL) FOR [p_compname]
GO
ALTER TABLE [dbo].[product_comp] ADD  DEFAULT ('1') FOR [p_comp_op]
GO
ALTER TABLE [dbo].[product_comp] ADD  DEFAULT ('') FOR [p_writeday]
GO
