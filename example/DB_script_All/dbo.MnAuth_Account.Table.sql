USE [jns9778]
GO
/****** Object:  Table [dbo].[MnAuth_Account]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MnAuth_Account](
	[account_bt] [char](10) NOT NULL,
	[auth_ac_idx] [int] IDENTITY(1,1) NOT NULL,
	[auth_idx] [int] NOT NULL,
	[account_id] [varchar](20) NULL,
	[accountType_cd] [char](1) NOT NULL,
	[account_idx] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[auth_ac_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MnAuth_Account] ADD  DEFAULT ('0000000000') FOR [account_bt]
GO
ALTER TABLE [dbo].[MnAuth_Account]  WITH CHECK ADD FOREIGN KEY([auth_idx])
REFERENCES [dbo].[MnAuth_Base] ([auth_idx])
GO
