USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_PG_Toss]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_PG_Toss](
	[pg_idx] [int] IDENTITY(1,1) NOT NULL,
	[ord_id] [varchar](14) NOT NULL,
	[paymentKey] [varchar](100) NOT NULL,
	[amount] [int] NOT NULL,
	[memo] [nvarchar](100) NULL,
	[create_dt] [datetime] NOT NULL,
	[update_dt] [datetime] NULL,
 CONSTRAINT [PK_ORD_PG_Toss] PRIMARY KEY CLUSTERED 
(
	[pg_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_PG_Toss] ADD  CONSTRAINT [DF_ORD_PG_Toss_create_dt]  DEFAULT (getdate()) FOR [create_dt]
GO
