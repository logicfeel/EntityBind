USE [jns9778]
GO
/****** Object:  Table [dbo].[POT_MebPoint]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POT_MebPoint](
	[pot_id] [int] NULL,
	[mp_idx] [int] IDENTITY(1,1) NOT NULL,
	[point_it] [int] NOT NULL,
	[minus_yn] [char](1) NOT NULL,
	[ord_id] [varchar](14) NULL,
	[meb_idx] [int] NOT NULL,
	[caption] [nvarchar](30) NULL,
	[create_dt] [datetime] NOT NULL,
 CONSTRAINT [PK__POT_MebP__F09E45965AD97420] PRIMARY KEY CLUSTERED 
(
	[mp_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[POT_MebPoint] ADD  CONSTRAINT [DF__POT_MebPo__minus__57FD0775]  DEFAULT ('N') FOR [minus_yn]
GO
ALTER TABLE [dbo].[POT_MebPoint] ADD  CONSTRAINT [DF__POT_MebPo__creat__58F12BAE]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[POT_MebPoint]  WITH CHECK ADD  CONSTRAINT [FK__POT_MebPo__meb_i__4A6E022D] FOREIGN KEY([meb_idx])
REFERENCES [dbo].[POT_Member] ([meb_idx])
GO
ALTER TABLE [dbo].[POT_MebPoint] CHECK CONSTRAINT [FK__POT_MebPo__meb_i__4A6E022D]
GO
ALTER TABLE [dbo].[POT_MebPoint]  WITH CHECK ADD  CONSTRAINT [FK__POT_MebPo__pot_i__4979DDF4] FOREIGN KEY([pot_id])
REFERENCES [dbo].[POT_Master] ([pot_id])
GO
ALTER TABLE [dbo].[POT_MebPoint] CHECK CONSTRAINT [FK__POT_MebPo__pot_i__4979DDF4]
GO
