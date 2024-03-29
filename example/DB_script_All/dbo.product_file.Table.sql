USE [jns9778]
GO
/****** Object:  Table [dbo].[product_file]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_file](
	[p_file_id] [int] NOT NULL,
	[p_id] [int] NULL,
	[p_filename] [varchar](60) NULL,
	[p_file_op] [tinyint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[p_file_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[product_file] ADD  DEFAULT (NULL) FOR [p_id]
GO
ALTER TABLE [dbo].[product_file] ADD  DEFAULT (NULL) FOR [p_filename]
GO
ALTER TABLE [dbo].[product_file] ADD  DEFAULT ('0') FOR [p_file_op]
GO
