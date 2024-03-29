USE [jns9778]
GO
/****** Object:  Table [dbo].[SYS_Image]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SYS_Image](
	[img_idx] [int] IDENTITY(1,1) NOT NULL,
	[position_cd] [varchar](10) NOT NULL,
	[pos_idx] [int] NULL,
	[pos_id] [varchar](20) NULL,
	[sub_idx] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[img_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
