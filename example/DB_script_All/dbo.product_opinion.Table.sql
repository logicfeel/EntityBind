USE [jns9778]
GO
/****** Object:  Table [dbo].[product_opinion]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_opinion](
	[po_num] [int] NOT NULL,
	[p_id] [int] NOT NULL,
	[m_id] [varchar](14) NOT NULL,
	[m_name] [varchar](20) NOT NULL,
	[po_content] [text] NOT NULL,
	[po_writedate] [varchar](12) NOT NULL,
	[po_point] [tinyint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[po_num] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[product_opinion] ADD  DEFAULT ('0') FOR [p_id]
GO
ALTER TABLE [dbo].[product_opinion] ADD  DEFAULT ('') FOR [m_id]
GO
ALTER TABLE [dbo].[product_opinion] ADD  DEFAULT ('') FOR [m_name]
GO
ALTER TABLE [dbo].[product_opinion] ADD  DEFAULT ('') FOR [po_writedate]
GO
ALTER TABLE [dbo].[product_opinion] ADD  DEFAULT ('0') FOR [po_point]
GO
