USE [jns9778]
GO
/****** Object:  Table [dbo].[DGN_Popup]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DGN_Popup](
	[type_cd] [char](1) NOT NULL,
	[pop_idx] [int] IDENTITY(1,1) NOT NULL,
	[width_it] [int] NULL,
	[height_it] [int] NULL,
	[xPosition_cd] [char](1) NULL,
	[yPosition_cd] [char](1) NULL,
	[begin_dt] [datetime] NULL,
	[close_dt] [datetime] NULL,
	[title] [nvarchar](20) NOT NULL,
	[contents] [nvarchar](2000) NULL,
	[active_yn] [char](1) NOT NULL,
	[del_yn] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[pop_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DGN_Popup] ADD  DEFAULT ('N') FOR [del_yn]
GO
