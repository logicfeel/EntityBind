USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_BaseDelivery]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_BaseDelivery](
	[sto_id] [varchar](6) NOT NULL,
	[deli_mn] [int] NOT NULL,
	[base_mn] [int] NOT NULL,
	[base_cd] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[sto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
