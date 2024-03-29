USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_PG_LG]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_PG_LG](
	[pg_idx] [int] IDENTITY(1,1) NOT NULL,
	[ord_id] [varchar](14) NULL,
	[approval_yn] [char](1) NULL,
	[pay_mn] [int] NULL,
	[create_dt] [datetime] NOT NULL,
	[LGD_OID] [varchar](16) NULL,
	[LGD_TID] [varchar](20) NULL,
	[LGD_MID] [varchar](20) NULL,
	[LGD_AMOUNT] [int] NULL,
	[LGD_RESPCODE] [varchar](10) NULL,
	[LGD_RESPMSG] [varchar](200) NULL,
 CONSTRAINT [PK__ORD_PG__5EEC1E2B45DE573A] PRIMARY KEY CLUSTERED 
(
	[pg_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_PG_LG] ADD  CONSTRAINT [DF__ORD_PG__create_d__43F60EC8]  DEFAULT (getdate()) FOR [create_dt]
GO
