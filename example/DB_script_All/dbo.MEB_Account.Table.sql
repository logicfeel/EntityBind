USE [jns9778]
GO
/****** Object:  Table [dbo].[MEB_Account]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEB_Account](
	[meb_idx] [int] NOT NULL,
	[meb_id] [varchar](20) NOT NULL,
	[passwd] [varchar](20) NOT NULL,
	[update_dt] [datetime] NULL,
 CONSTRAINT [PK__MEB_Acco__CE90273B125EB334] PRIMARY KEY CLUSTERED 
(
	[meb_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MEB_Account]  WITH CHECK ADD  CONSTRAINT [FK__MEB_Accou__meb_i__3FF073BA] FOREIGN KEY([meb_idx])
REFERENCES [dbo].[MEB_Master] ([meb_idx])
GO
ALTER TABLE [dbo].[MEB_Account] CHECK CONSTRAINT [FK__MEB_Accou__meb_i__3FF073BA]
GO
