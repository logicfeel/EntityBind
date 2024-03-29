USE [jns9778]
GO
/****** Object:  Table [dbo].[MnAuth_Base]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MnAuth_Base](
	[auth_idx] [int] IDENTITY(1,1) NOT NULL,
	[onwer_bt] [char](10) NOT NULL,
	[etc_bt] [char](10) NOT NULL,
	[create_dt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[auth_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MnAuth_Base] ADD  DEFAULT ('0000000000') FOR [onwer_bt]
GO
ALTER TABLE [dbo].[MnAuth_Base] ADD  DEFAULT ('0000000000') FOR [etc_bt]
GO
ALTER TABLE [dbo].[MnAuth_Base] ADD  DEFAULT (getdate()) FOR [create_dt]
GO
