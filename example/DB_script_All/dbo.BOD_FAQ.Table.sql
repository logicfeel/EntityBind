USE [jns9778]
GO
/****** Object:  Table [dbo].[BOD_FAQ]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BOD_FAQ](
	[faq_idx] [int] IDENTITY(1,1) NOT NULL,
	[question] [nvarchar](1000) NOT NULL,
	[answer] [nvarchar](1000) NULL,
	[create_dt] [smalldatetime] NOT NULL,
	[rank_it] [smallint] NOT NULL,
	[typeCode] [varchar](5) NOT NULL,
 CONSTRAINT [PK__BOD_FAQ__E410F28C7E57BA87] PRIMARY KEY CLUSTERED 
(
	[faq_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BOD_FAQ] ADD  CONSTRAINT [DF__BOD_FAQ__create___7B7B4DDC]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[BOD_FAQ] ADD  CONSTRAINT [DF__BOD_FAQ__rank_it__7C6F7215]  DEFAULT ((99)) FOR [rank_it]
GO
