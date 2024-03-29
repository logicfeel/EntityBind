USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_Pay]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_Pay](
	[ord_id] [varchar](14) NOT NULL,
	[pay_mn] [int] NOT NULL,
	[usePoint_it] [int] NOT NULL,
	[state_cd] [char](2) NOT NULL,
	[method_cd] [char](1) NOT NULL,
	[depositor] [nvarchar](10) NULL,
	[memo] [nvarchar](50) NULL,
	[bak_idx] [int] NULL,
 CONSTRAINT [PK__ORD_Pay__DC39D7DF4119A21D] PRIMARY KEY CLUSTERED 
(
	[ord_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_Pay]  WITH CHECK ADD  CONSTRAINT [FK__ORD_Pay__bak_idx__469D7149] FOREIGN KEY([bak_idx])
REFERENCES [dbo].[ORD_Bank] ([bak_idx])
GO
ALTER TABLE [dbo].[ORD_Pay] CHECK CONSTRAINT [FK__ORD_Pay__bak_idx__469D7149]
GO
ALTER TABLE [dbo].[ORD_Pay]  WITH CHECK ADD  CONSTRAINT [FK__ORD_Pay__ord_id__45A94D10] FOREIGN KEY([ord_id])
REFERENCES [dbo].[ORD_Master] ([ord_id])
GO
ALTER TABLE [dbo].[ORD_Pay] CHECK CONSTRAINT [FK__ORD_Pay__ord_id__45A94D10]
GO
