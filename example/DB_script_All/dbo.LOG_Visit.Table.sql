USE [jns9778]
GO
/****** Object:  Table [dbo].[LOG_Visit]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOG_Visit](
	[vst_idx] [int] IDENTITY(1,1) NOT NULL,
	[client_id] [varchar](20) NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[view_it] [smallint] NOT NULL,
	[referer] [varchar](200) NULL,
	[meb_idx] [int] NULL,
	[ip] [varchar](30) NULL,
	[agent] [varchar](200) NULL,
 CONSTRAINT [PK__LOG_Visi__E2520EF10E8E2250] PRIMARY KEY CLUSTERED 
(
	[vst_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[LOG_Visit] ADD  CONSTRAINT [DF__LOG_Visit__creat__0BB1B5A5]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[LOG_Visit] ADD  CONSTRAINT [DF__LOG_Visit__view___0CA5D9DE]  DEFAULT ((1)) FOR [view_it]
GO
