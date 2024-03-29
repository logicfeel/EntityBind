USE [jns9778]
GO
/****** Object:  Table [dbo].[popup]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[popup](
	[pop_no] [int] NOT NULL,
	[pop_name] [varchar](50) NOT NULL,
	[pop_desc] [varchar](100) NULL,
	[pop_isopen] [char](1) NOT NULL,
	[pop_image] [varchar](80) NOT NULL,
	[pop_link] [varchar](100) NULL,
	[pop_startday] [varchar](8) NOT NULL,
	[pop_endday] [varchar](8) NULL,
	[pop_width] [int] NULL,
	[pop_height] [int] NULL,
	[pop_writeday] [varchar](12) NULL,
PRIMARY KEY CLUSTERED 
(
	[pop_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT ('') FOR [pop_name]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT (NULL) FOR [pop_desc]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT ('Y') FOR [pop_isopen]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT ('') FOR [pop_image]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT (NULL) FOR [pop_link]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT ('') FOR [pop_startday]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT (NULL) FOR [pop_endday]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT (NULL) FOR [pop_width]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT (NULL) FOR [pop_height]
GO
ALTER TABLE [dbo].[popup] ADD  DEFAULT (NULL) FOR [pop_writeday]
GO
