USE [jns9778]
GO
/****** Object:  Table [dbo].[DGN_RollingImage]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DGN_RollingImage](
	[pcLink] [varchar](200) NULL,
	[title] [nvarchar](20) NOT NULL,
	[active_yn] [char](1) NOT NULL,
	[pcUrl] [varchar](200) NULL,
	[mUrl] [varchar](200) NULL,
	[mLink] [varchar](200) NULL,
	[roll_idx] [int] NOT NULL,
	[img_idx] [int] NOT NULL,
	[del_yn] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roll_idx] ASC,
	[img_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DGN_RollingImage] ADD  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[DGN_RollingImage]  WITH CHECK ADD  CONSTRAINT [FK__DGN_Rolli__roll___194BA7E5] FOREIGN KEY([roll_idx])
REFERENCES [dbo].[DGN_Rolling] ([roll_idx])
GO
ALTER TABLE [dbo].[DGN_RollingImage] CHECK CONSTRAINT [FK__DGN_Rolli__roll___194BA7E5]
GO
