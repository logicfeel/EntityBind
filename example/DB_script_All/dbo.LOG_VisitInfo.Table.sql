USE [jns9778]
GO
/****** Object:  Table [dbo].[LOG_VisitInfo]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOG_VisitInfo](
	[vst_idx] [int] NOT NULL,
	[visitUrl] [varchar](200) NULL,
	[time_dt] [datetime] NULL,
	[vsi_idx] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[vst_idx] ASC,
	[vsi_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[LOG_VisitInfo]  WITH CHECK ADD FOREIGN KEY([vst_idx])
REFERENCES [dbo].[LOG_Visit] ([vst_idx])
GO
