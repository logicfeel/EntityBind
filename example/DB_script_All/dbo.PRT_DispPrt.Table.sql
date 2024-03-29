USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_DispPrt]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_DispPrt](
	[rank_it] [smallint] NOT NULL,
	[update_dt] [datetime] NOT NULL,
	[prt_id] [int] NOT NULL,
	[dsp_id] [int] NOT NULL,
 CONSTRAINT [PK__PRT_Disp__B6F7A66C08A03ED0] PRIMARY KEY CLUSTERED 
(
	[prt_id] ASC,
	[dsp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_DispPrt] ADD  CONSTRAINT [DF__PRT_DispP__rank___06B7F65E]  DEFAULT ((99)) FOR [rank_it]
GO
ALTER TABLE [dbo].[PRT_DispPrt]  WITH CHECK ADD  CONSTRAINT [FK__PRT_DispP__dsp_i__511AFFBC] FOREIGN KEY([dsp_id])
REFERENCES [dbo].[PRT_Display] ([dsp_id])
GO
ALTER TABLE [dbo].[PRT_DispPrt] CHECK CONSTRAINT [FK__PRT_DispP__dsp_i__511AFFBC]
GO
ALTER TABLE [dbo].[PRT_DispPrt]  WITH CHECK ADD  CONSTRAINT [FK__PRT_DispP__prt_i__5026DB83] FOREIGN KEY([prt_id])
REFERENCES [dbo].[PRT_Master] ([prt_id])
GO
ALTER TABLE [dbo].[PRT_DispPrt] CHECK CONSTRAINT [FK__PRT_DispP__prt_i__5026DB83]
GO
