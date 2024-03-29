USE [jns9778]
GO
/****** Object:  Table [dbo].[zipcode]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[zipcode](
	[SEQ] [int] NOT NULL,
	[ZIPCODE] [varchar](7) NULL,
	[SIDO] [varchar](4) NULL,
	[GUGUN] [varchar](15) NULL,
	[DONG] [varchar](43) NULL,
	[BUNJI] [varchar](17) NULL,
PRIMARY KEY CLUSTERED 
(
	[SEQ] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[zipcode] ADD  DEFAULT ('0') FOR [SEQ]
GO
ALTER TABLE [dbo].[zipcode] ADD  DEFAULT (NULL) FOR [ZIPCODE]
GO
ALTER TABLE [dbo].[zipcode] ADD  DEFAULT (NULL) FOR [SIDO]
GO
ALTER TABLE [dbo].[zipcode] ADD  DEFAULT (NULL) FOR [GUGUN]
GO
ALTER TABLE [dbo].[zipcode] ADD  DEFAULT (NULL) FOR [DONG]
GO
ALTER TABLE [dbo].[zipcode] ADD  DEFAULT (NULL) FOR [BUNJI]
GO
