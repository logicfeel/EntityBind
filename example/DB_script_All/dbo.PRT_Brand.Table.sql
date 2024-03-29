USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Brand]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Brand](
	[brd_idx] [int] IDENTITY(1,1) NOT NULL,
	[brand] [nvarchar](30) NOT NULL,
	[maker] [nvarchar](30) NULL,
	[del_yn] [char](1) NOT NULL,
	[contents] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[brd_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Brand] ADD  DEFAULT ('N') FOR [del_yn]
GO
