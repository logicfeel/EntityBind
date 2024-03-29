USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Option]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Option](
	[prt_id] [int] NOT NULL,
	[opt_idx] [int] NOT NULL,
	[default_yn] [char](1) NOT NULL,
	[sell_mn] [int] NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[discount_mn] [int] NOT NULL,
	[point_it] [int] NOT NULL,
	[optName] [nvarchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[prt_id] ASC,
	[opt_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Option] ADD  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[PRT_Option] ADD  DEFAULT ((0)) FOR [point_it]
GO
ALTER TABLE [dbo].[PRT_Option]  WITH CHECK ADD  CONSTRAINT [FK__PRT_Optio__prt_i__55DFB4D9] FOREIGN KEY([prt_id])
REFERENCES [dbo].[PRT_Master] ([prt_id])
GO
ALTER TABLE [dbo].[PRT_Option] CHECK CONSTRAINT [FK__PRT_Optio__prt_i__55DFB4D9]
GO
