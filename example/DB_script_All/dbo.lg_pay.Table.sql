USE [jns9778]
GO
/****** Object:  Table [dbo].[lg_pay]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lg_pay](
	[LGD_TID] [varchar](20) NOT NULL,
	[LGD_MID] [varchar](20) NOT NULL,
	[LGD_OID] [varchar](16) NOT NULL,
	[LGD_AMOUNT] [int] NOT NULL,
	[LGD_RESPCODE] [varchar](10) NOT NULL,
	[LGD_RESPMSG] [varchar](200) NOT NULL,
	[write_date] [varchar](14) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LGD_TID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[lg_pay] ADD  DEFAULT ('') FOR [LGD_TID]
GO
ALTER TABLE [dbo].[lg_pay] ADD  DEFAULT ('') FOR [LGD_MID]
GO
ALTER TABLE [dbo].[lg_pay] ADD  DEFAULT ('') FOR [LGD_OID]
GO
ALTER TABLE [dbo].[lg_pay] ADD  DEFAULT ('0') FOR [LGD_AMOUNT]
GO
ALTER TABLE [dbo].[lg_pay] ADD  DEFAULT ('') FOR [LGD_RESPCODE]
GO
ALTER TABLE [dbo].[lg_pay] ADD  DEFAULT ('') FOR [LGD_RESPMSG]
GO
ALTER TABLE [dbo].[lg_pay] ADD  DEFAULT ('') FOR [write_date]
GO
