USE [jns9778]
GO
/****** Object:  Table [dbo].[LOG_Keyword]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOG_Keyword](
	[key_idx] [int] IDENTITY(1,1) NOT NULL,
	[keyword] [nvarchar](100) NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[position_cd] [char](3) NOT NULL,
	[vst_idx] [int] NULL,
 CONSTRAINT [PK__LOG_Sear__D6D53AB608D548FA] PRIMARY KEY CLUSTERED 
(
	[key_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[LOG_Keyword] ADD  CONSTRAINT [DF__LOG_Searc__creat__06ED0088]  DEFAULT (getdate()) FOR [create_dt]
GO
