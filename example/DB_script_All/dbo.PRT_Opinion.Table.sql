USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Opinion]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Opinion](
	[prt_id] [int] NOT NULL,
	[opi_idx] [int] NOT NULL,
	[point_it] [int] NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[contents] [nvarchar](1000) NULL,
	[grade_cd] [char](1) NOT NULL,
	[ord_id] [varchar](14) NULL,
 CONSTRAINT [PK__PRT_Opin__8AEAA8AE1D9B5BB6] PRIMARY KEY CLUSTERED 
(
	[prt_id] ASC,
	[opi_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Opinion] ADD  CONSTRAINT [DF__PRT_Opini__point__1ABEEF0B]  DEFAULT ((0)) FOR [point_it]
GO
ALTER TABLE [dbo].[PRT_Opinion] ADD  CONSTRAINT [DF__PRT_Opini__creat__1BB31344]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[PRT_Opinion]  WITH CHECK ADD  CONSTRAINT [FK__PRT_Opini__prt_i__54EB90A0] FOREIGN KEY([prt_id])
REFERENCES [dbo].[PRT_Master] ([prt_id])
GO
ALTER TABLE [dbo].[PRT_Opinion] CHECK CONSTRAINT [FK__PRT_Opini__prt_i__54EB90A0]
GO
