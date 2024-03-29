USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_Product]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_Product](
	[ord_id] [varchar](14) NOT NULL,
	[op_idx] [tinyint] NOT NULL,
	[prt_id] [int] NOT NULL,
	[opt_idx] [int] NOT NULL,
	[buy_mn] [int] NOT NULL,
	[qty_it] [tinyint] NOT NULL,
	[sum_mn] [int] NOT NULL,
	[point_it] [int] NOT NULL,
	[deli_mn] [int] NOT NULL,
	[deli_idx] [int] NOT NULL,
	[del_yn] [char](1) NOT NULL,
 CONSTRAINT [PK__ORD_Prod__9ACFA1434D7F7902] PRIMARY KEY CLUSTERED 
(
	[ord_id] ASC,
	[op_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_Product] ADD  CONSTRAINT [DF__ORD_Produ__qty_i__49AEE81E]  DEFAULT ((1)) FOR [qty_it]
GO
ALTER TABLE [dbo].[ORD_Product] ADD  CONSTRAINT [DF__ORD_Produ__point__4AA30C57]  DEFAULT ((0)) FOR [point_it]
GO
ALTER TABLE [dbo].[ORD_Product] ADD  CONSTRAINT [DF__ORD_Produ__deli___4B973090]  DEFAULT ((0)) FOR [deli_mn]
GO
ALTER TABLE [dbo].[ORD_Product] ADD  CONSTRAINT [DF__ORD_Produ__del_y__48BAC3E5]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[ORD_Product]  WITH CHECK ADD  CONSTRAINT [FK__ORD_Produ__deil___4885B9BB] FOREIGN KEY([deli_idx])
REFERENCES [dbo].[ORD_Delivery] ([deli_idx])
GO
ALTER TABLE [dbo].[ORD_Product] CHECK CONSTRAINT [FK__ORD_Produ__deil___4885B9BB]
GO
ALTER TABLE [dbo].[ORD_Product]  WITH CHECK ADD  CONSTRAINT [FK__ORD_Produ__ord_i__47919582] FOREIGN KEY([ord_id])
REFERENCES [dbo].[ORD_Master] ([ord_id])
GO
ALTER TABLE [dbo].[ORD_Product] CHECK CONSTRAINT [FK__ORD_Produ__ord_i__47919582]
GO
