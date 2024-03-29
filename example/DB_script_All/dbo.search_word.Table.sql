USE [jns9778]
GO
/****** Object:  Table [dbo].[search_word]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[search_word](
	[sw_id] [int] NOT NULL,
	[write_day] [varchar](12) NULL,
	[search_word] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[sw_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[search_word] ADD  DEFAULT (NULL) FOR [write_day]
GO
ALTER TABLE [dbo].[search_word] ADD  DEFAULT (NULL) FOR [search_word]
GO
