USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Info]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Info](
	[prt_id] [int] NOT NULL,
	[state_cd] [char](2) NOT NULL,
	[stock_it] [smallint] NOT NULL,
	[recommRange] [smallint] NULL,
	[kind_cd] [char](3) NULL,
	[begin_dt] [smalldatetime] NULL,
	[close_dt] [smalldatetime] NULL,
	[brd_idx] [int] NULL,
	[keyword] [nvarchar](100) NULL,
	[contents] [nvarchar](2000) NULL,
 CONSTRAINT [PK__PRT_Info__392CFC261229A90A] PRIMARY KEY CLUSTERED 
(
	[prt_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Info] ADD  CONSTRAINT [DF__PRT_Info__stock___10416098]  DEFAULT ((0)) FOR [stock_it]
GO
ALTER TABLE [dbo].[PRT_Info]  WITH CHECK ADD  CONSTRAINT [FK__PRT_Info__brd_id__53F76C67] FOREIGN KEY([brd_idx])
REFERENCES [dbo].[PRT_Brand] ([brd_idx])
GO
ALTER TABLE [dbo].[PRT_Info] CHECK CONSTRAINT [FK__PRT_Info__brd_id__53F76C67]
GO
ALTER TABLE [dbo].[PRT_Info]  WITH CHECK ADD  CONSTRAINT [FK__PRT_Info__prt_id__5303482E] FOREIGN KEY([prt_id])
REFERENCES [dbo].[PRT_Master] ([prt_id])
GO
ALTER TABLE [dbo].[PRT_Info] CHECK CONSTRAINT [FK__PRT_Info__prt_id__5303482E]
GO
