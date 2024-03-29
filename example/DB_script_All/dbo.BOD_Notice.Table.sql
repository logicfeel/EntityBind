USE [jns9778]
GO
/****** Object:  Table [dbo].[BOD_Notice]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BOD_Notice](
	[ntc_idx] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](30) NOT NULL,
	[top_yn] [char](1) NOT NULL,
	[popup_yn] [char](1) NOT NULL,
	[writer] [nvarchar](10) NULL,
	[contents] [nvarchar](2000) NULL,
	[state_cd] [char](1) NOT NULL,
	[create_dt] [smalldatetime] NOT NULL,
	[del_yn] [char](1) NOT NULL,
 CONSTRAINT [PK__BOD_Noti__0A8CA9FA041093DD] PRIMARY KEY CLUSTERED 
(
	[ntc_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BOD_Notice] ADD  CONSTRAINT [DF__BOD_Notic__creat__01342732]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[BOD_Notice] ADD  CONSTRAINT [DF__BOD_Notic__del_y__02284B6B]  DEFAULT ('N') FOR [del_yn]
GO
