USE [jns9778]
GO
/****** Object:  Table [dbo].[idx_test]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[idx_test](
	[idx] [int] NOT NULL,
	[i_idx] [int] IDENTITY(1,1) NOT NULL,
	[val] [nchar](10) NULL,
 CONSTRAINT [PK_idx_test] PRIMARY KEY CLUSTERED 
(
	[idx] ASC,
	[i_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
