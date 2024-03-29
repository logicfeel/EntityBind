USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_RentalOrder]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_RentalOrder](
	[ro_idx] [int] NOT NULL,
	[begin_dt] [smalldatetime] NOT NULL,
	[close_dt] [smalldatetime] NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[prt_id] [int] NOT NULL,
	[stc_cnt] [int] NOT NULL,
	[ord_id] [varchar](14) NULL,
 CONSTRAINT [PK__PRT_Rent__49726A1A2CDD9F46] PRIMARY KEY CLUSTERED 
(
	[prt_id] ASC,
	[stc_cnt] ASC,
	[ro_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_RentalOrder] ADD  CONSTRAINT [DF__PRT_Renta__creat__2AF556D4]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[PRT_RentalOrder]  WITH CHECK ADD  CONSTRAINT [FK__PRT_RentalOrder__57C7FD4B] FOREIGN KEY([prt_id], [stc_cnt])
REFERENCES [dbo].[PRT_Rental] ([prt_id], [stc_cnt])
GO
ALTER TABLE [dbo].[PRT_RentalOrder] CHECK CONSTRAINT [FK__PRT_RentalOrder__57C7FD4B]
GO
