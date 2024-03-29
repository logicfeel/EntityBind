USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Display]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Display](
	[dsp_id] [int] IDENTITY(1,1) NOT NULL,
	[parent_id] [int] NOT NULL,
	[rank_it] [smallint] NOT NULL,
	[dspName] [nvarchar](20) NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[subName] [nvarchar](100) NULL,
 CONSTRAINT [PK__PRT_Disp__FDB5A4A903DB89B3] PRIMARY KEY CLUSTERED 
(
	[dsp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Display] ADD  CONSTRAINT [DF__PRT_Displ__paren__7F16D496]  DEFAULT ((0)) FOR [parent_id]
GO
ALTER TABLE [dbo].[PRT_Display] ADD  CONSTRAINT [DF__PRT_Displ__rank___000AF8CF]  DEFAULT ((99)) FOR [rank_it]
GO
ALTER TABLE [dbo].[PRT_Display] ADD  CONSTRAINT [DF__PRT_Displ__del_y__00FF1D08]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[PRT_Display] ADD  CONSTRAINT [DF__PRT_Displ__creat__01F34141]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[PRT_Display] ADD  CONSTRAINT [DF_PRT_Display_subName]  DEFAULT ('') FOR [subName]
GO
ALTER TABLE [dbo].[PRT_Display]  WITH CHECK ADD  CONSTRAINT [FK__PRT_Displ__dsp_i__4F32B74A] FOREIGN KEY([dsp_id])
REFERENCES [dbo].[PRT_Display] ([dsp_id])
GO
ALTER TABLE [dbo].[PRT_Display] CHECK CONSTRAINT [FK__PRT_Displ__dsp_i__4F32B74A]
GO
