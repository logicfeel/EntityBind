USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_Bank]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_Bank](
	[bak_idx] [int] IDENTITY(1,1) NOT NULL,
	[bankName] [nvarchar](20) NOT NULL,
	[account] [varchar](20) NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[depositor] [nvarchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[bak_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_Bank] ADD  DEFAULT ('N') FOR [del_yn]
GO
