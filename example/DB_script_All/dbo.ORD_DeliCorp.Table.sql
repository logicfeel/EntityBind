USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_DeliCorp]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_DeliCorp](
	[dco_idx] [int] IDENTITY(1,1) NOT NULL,
	[corpName] [nvarchar](10) NOT NULL,
	[checkURL] [varchar](100) NULL,
	[del_yn] [char](1) NOT NULL,
	[use_cd] [char](1) NOT NULL,
	[method_cd] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[dco_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_DeliCorp] ADD  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[ORD_DeliCorp] ADD  DEFAULT ('Y') FOR [use_cd]
GO
