USE [jns9778]
GO
/****** Object:  Table [dbo].[SYS_ImageFile]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SYS_ImageFile](
	[file_idx] [int] NOT NULL,
	[img_idx] [int] NOT NULL,
	[imgName] [nvarchar](100) NULL,
	[imgPath] [nvarchar](200) NULL,
	[imgUrl] [nvarchar](200) NULL,
	[orgName] [nvarchar](100) NULL,
	[width_it] [int] NULL,
	[height_it] [int] NULL,
	[size_it] [int] NULL,
	[create_dt] [datetime] NOT NULL,
	[delete_dt] [datetime] NULL,
	[del_yn] [char](1) NOT NULL,
	[thumName] [nvarchar](100) NULL,
 CONSTRAINT [PK__SYS_Imag__C6F4764F79273038] PRIMARY KEY CLUSTERED 
(
	[file_idx] ASC,
	[img_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[SYS_ImageFile] ADD  CONSTRAINT [DF__SYS_Image__creat__22D5121F]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[SYS_ImageFile] ADD  CONSTRAINT [DF__SYS_Image__del_y__23C93658]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[SYS_ImageFile]  WITH CHECK ADD  CONSTRAINT [FK__SYS_Image__img_i__25B17ECA] FOREIGN KEY([img_idx])
REFERENCES [dbo].[SYS_Image] ([img_idx])
GO
ALTER TABLE [dbo].[SYS_ImageFile] CHECK CONSTRAINT [FK__SYS_Image__img_i__25B17ECA]
GO
