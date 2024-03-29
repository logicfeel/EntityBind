USE [jns9778]
GO
/****** Object:  Table [dbo].[DGN_Rolling]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DGN_Rolling](
	[help] [nvarchar](100) NULL,
	[title] [nvarchar](20) NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[skin_it] [int] NOT NULL,
	[roll_idx] [int] IDENTITY(1,1) NOT NULL,
	[pcWidth_it] [int] NULL,
	[pcHeight_it] [int] NULL,
	[mWidth_it] [int] NULL,
	[mHeight_it] [int] NULL,
 CONSTRAINT [PK__DGN_Roll__43738A10B951EB78] PRIMARY KEY CLUSTERED 
(
	[roll_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DGN_Rolling] ADD  CONSTRAINT [DF_DGN_Rolling_del_yn]  DEFAULT ('N') FOR [del_yn]
GO
