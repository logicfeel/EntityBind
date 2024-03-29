USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Delivery]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Delivery](
	[prt_id] [int] NOT NULL,
	[method_cd] [char](4) NOT NULL,
	[deli_mn] [int] NOT NULL,
	[underBase_mn] [int] NOT NULL,
	[under_mn] [int] NOT NULL,
	[choice_bt] [char](5) NOT NULL,
	[default_cd] [char](3) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[prt_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Delivery] ADD  DEFAULT ((0)) FOR [deli_mn]
GO
ALTER TABLE [dbo].[PRT_Delivery] ADD  DEFAULT ((0)) FOR [underBase_mn]
GO
ALTER TABLE [dbo].[PRT_Delivery] ADD  DEFAULT ((0)) FOR [under_mn]
GO
ALTER TABLE [dbo].[PRT_Delivery]  WITH CHECK ADD  CONSTRAINT [FK__PRT_Deliv__prt_i__4E3E9311] FOREIGN KEY([prt_id])
REFERENCES [dbo].[PRT_Master] ([prt_id])
GO
ALTER TABLE [dbo].[PRT_Delivery] CHECK CONSTRAINT [FK__PRT_Deliv__prt_i__4E3E9311]
GO
