USE [jns9778]
GO
/****** Object:  Table [dbo].[BOD_Event]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BOD_Event](
	[evt_idx] [int] IDENTITY(1,1) NOT NULL,
	[writer] [nvarchar](10) NULL,
	[title] [nvarchar](20) NOT NULL,
	[contents] [nvarchar](2000) NULL,
	[create_dt] [datetime] NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[active_yn] [char](1) NOT NULL,
	[begin_dt] [datetime] NULL,
	[close_dt] [datetime] NULL,
 CONSTRAINT [PK__BOD_Even__1DEE3FF90F0437D1] PRIMARY KEY CLUSTERED 
(
	[evt_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BOD_Event] ADD  CONSTRAINT [DF__BOD_Event__creat__0ECE1972]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[BOD_Event] ADD  CONSTRAINT [DF__BOD_Event__del_y__0FC23DAB]  DEFAULT ('N') FOR [del_yn]
GO
