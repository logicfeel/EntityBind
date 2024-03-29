USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Category]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Category](
	[ctg_id] [int] IDENTITY(1,1) NOT NULL,
	[rank_it] [smallint] NOT NULL,
	[cateName] [nvarchar](20) NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[parent_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ctg_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Category] ADD  DEFAULT ((99)) FOR [rank_it]
GO
ALTER TABLE [dbo].[PRT_Category] ADD  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[PRT_Category] ADD  DEFAULT ((0)) FOR [parent_id]
GO
ALTER TABLE [dbo].[PRT_Category]  WITH CHECK ADD FOREIGN KEY([ctg_id])
REFERENCES [dbo].[PRT_Category] ([ctg_id])
GO
