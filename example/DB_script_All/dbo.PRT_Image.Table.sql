USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Image]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Image](
	[prt_id] [int] NOT NULL,
	[img_idx] [int] IDENTITY(1,1) NOT NULL,
	[fileName] [varchar](100) NOT NULL,
	[rank_it] [smallint] NOT NULL,
	[position_cd] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[img_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Image] ADD  DEFAULT ((99)) FOR [rank_it]
GO
ALTER TABLE [dbo].[PRT_Image]  WITH CHECK ADD  CONSTRAINT [FK__PRT_Image__prt_i__520F23F5] FOREIGN KEY([prt_id])
REFERENCES [dbo].[PRT_Master] ([prt_id])
GO
ALTER TABLE [dbo].[PRT_Image] CHECK CONSTRAINT [FK__PRT_Image__prt_i__520F23F5]
GO
