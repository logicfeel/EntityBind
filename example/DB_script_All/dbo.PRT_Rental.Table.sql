USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Rental]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Rental](
	[prt_id] [int] NOT NULL,
	[stc_cnt] [int] NOT NULL,
	[identifier] [varchar](20) NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[memo] [nvarchar](100) NULL,
	[state_cd] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[prt_id] ASC,
	[stc_cnt] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Rental] ADD  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[PRT_Rental]  WITH CHECK ADD  CONSTRAINT [FK__PRT_Renta__prt_i__56D3D912] FOREIGN KEY([prt_id])
REFERENCES [dbo].[PRT_Master] ([prt_id])
GO
ALTER TABLE [dbo].[PRT_Rental] CHECK CONSTRAINT [FK__PRT_Renta__prt_i__56D3D912]
GO
