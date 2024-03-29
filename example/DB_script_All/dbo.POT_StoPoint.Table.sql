USE [jns9778]
GO
/****** Object:  Table [dbo].[POT_StoPoint]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POT_StoPoint](
	[pot_id] [int] NULL,
	[sp_idx] [int] NOT NULL,
	[sto_id] [int] NOT NULL,
	[point_it] [int] NOT NULL,
	[minus_yn] [char](1) NOT NULL,
	[ord_id] [varchar](14) NULL,
	[caption] [nvarchar](30) NULL,
	[create_dt] [datetime] NOT NULL,
 CONSTRAINT [PK__POT_StoP__01F2C97D65570293] PRIMARY KEY CLUSTERED 
(
	[sp_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[POT_StoPoint] ADD  CONSTRAINT [DF__POT_StoPo__minus__627A95E8]  DEFAULT ('N') FOR [minus_yn]
GO
ALTER TABLE [dbo].[POT_StoPoint] ADD  CONSTRAINT [DF__POT_StoPo__creat__636EBA21]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[POT_StoPoint]  WITH CHECK ADD  CONSTRAINT [FK__POT_StoPo__pot_i__4B622666] FOREIGN KEY([pot_id])
REFERENCES [dbo].[POT_Master] ([pot_id])
GO
ALTER TABLE [dbo].[POT_StoPoint] CHECK CONSTRAINT [FK__POT_StoPo__pot_i__4B622666]
GO
ALTER TABLE [dbo].[POT_StoPoint]  WITH CHECK ADD  CONSTRAINT [FK__POT_StoPo__sto_i__4C564A9F] FOREIGN KEY([sto_id])
REFERENCES [dbo].[POT_Store] ([sto_id])
GO
ALTER TABLE [dbo].[POT_StoPoint] CHECK CONSTRAINT [FK__POT_StoPo__sto_i__4C564A9F]
GO
