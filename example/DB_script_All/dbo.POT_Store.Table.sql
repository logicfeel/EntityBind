USE [jns9778]
GO
/****** Object:  Table [dbo].[POT_Store]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POT_Store](
	[sto_id] [int] NOT NULL,
	[total_it] [int] NOT NULL,
	[update_dt] [datetime] NULL,
 CONSTRAINT [PK__POT_Stor__7D70B2A06A1BB7B0] PRIMARY KEY CLUSTERED 
(
	[sto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[POT_Store] ADD  CONSTRAINT [DF__POT_Store__total__68336F3E]  DEFAULT ((0)) FOR [total_it]
GO
