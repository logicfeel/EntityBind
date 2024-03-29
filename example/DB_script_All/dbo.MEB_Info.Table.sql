USE [jns9778]
GO
/****** Object:  Table [dbo].[MEB_Info]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEB_Info](
	[meb_idx] [int] NOT NULL,
	[nickname] [nvarchar](10) NULL,
	[zipcode] [varchar](7) NULL,
	[addr1] [nvarchar](50) NULL,
	[addr2] [nvarchar](50) NULL,
	[update_dt] [datetime] NOT NULL,
	[tel] [varchar](15) NULL,
	[hp] [varchar](15) NULL,
	[join_cd] [smallint] NULL,
	[joinComment] [nvarchar](20) NULL,
	[memo] [nvarchar](200) NULL,
	[email] [varchar](100) NULL,
 CONSTRAINT [PK__MEB_Info__CE90273B17236851] PRIMARY KEY CLUSTERED 
(
	[meb_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MEB_Info] ADD  CONSTRAINT [DF__MEB_Info__create__153B1FDF]  DEFAULT (getdate()) FOR [update_dt]
GO
ALTER TABLE [dbo].[MEB_Info]  WITH CHECK ADD  CONSTRAINT [FK__MEB_Info__meb_id__40E497F3] FOREIGN KEY([meb_idx])
REFERENCES [dbo].[MEB_Master] ([meb_idx])
GO
ALTER TABLE [dbo].[MEB_Info] CHECK CONSTRAINT [FK__MEB_Info__meb_id__40E497F3]
GO
