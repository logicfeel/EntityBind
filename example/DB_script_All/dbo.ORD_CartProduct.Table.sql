USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_CartProduct]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_CartProduct](
	[crt_idx] [int] NOT NULL,
	[prt_id] [int] NOT NULL,
	[opt_idx] [int] NOT NULL,
	[qty_it] [tinyint] NOT NULL,
	[state_cd] [char](1) NOT NULL,
	[ord_id] [varchar](14) NULL,
	[create_dt] [datetime] NOT NULL,
	[del_yn] [char](1) NOT NULL,
 CONSTRAINT [PK_ORD_CartProduct] PRIMARY KEY CLUSTERED 
(
	[crt_idx] ASC,
	[prt_id] ASC,
	[opt_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_CartProduct] ADD  CONSTRAINT [DF__ORD_CartP__qty_i__2942188C]  DEFAULT ((1)) FOR [qty_it]
GO
ALTER TABLE [dbo].[ORD_CartProduct] ADD  CONSTRAINT [DF__ORD_CartP__creat__2B2A60FE]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[ORD_CartProduct] ADD  CONSTRAINT [DF__ORD_CartP__del_y__2A363CC5]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[ORD_CartProduct]  WITH CHECK ADD  CONSTRAINT [FK__ORD_CartP__crt_i__41D8BC2C] FOREIGN KEY([crt_idx])
REFERENCES [dbo].[ORD_Cart] ([crt_idx])
GO
ALTER TABLE [dbo].[ORD_CartProduct] CHECK CONSTRAINT [FK__ORD_CartP__crt_i__41D8BC2C]
GO
ALTER TABLE [dbo].[ORD_CartProduct]  WITH CHECK ADD  CONSTRAINT [FK__ORD_CartP__ord_i__42CCE065] FOREIGN KEY([ord_id])
REFERENCES [dbo].[ORD_Master] ([ord_id])
GO
ALTER TABLE [dbo].[ORD_CartProduct] CHECK CONSTRAINT [FK__ORD_CartP__ord_i__42CCE065]
GO
