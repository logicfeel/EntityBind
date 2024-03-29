USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_QnA]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_QnA](
	[qna_idx] [int] IDENTITY(1,1) NOT NULL,
	[prt_id] [int] NOT NULL,
	[title] [nvarchar](50) NOT NULL,
	[contents] [nvarchar](2000) NULL,
	[meb_idx] [int] NULL,
	[open_yn] [char](1) NOT NULL,
	[passwd] [varchar](20) NULL,
	[answer] [nvarchar](2000) NULL,
	[writer] [nvarchar](10) NULL,
	[state_cd] [char](1) NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[answer_dt] [datetime] NULL,
 CONSTRAINT [PK__PRT_QnA__D7F917F4C307F481] PRIMARY KEY CLUSTERED 
(
	[qna_idx] ASC,
	[prt_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_QnA] ADD  CONSTRAINT [DF__PRT_QnA__create___1E105D02]  DEFAULT (getdate()) FOR [create_dt]
GO
