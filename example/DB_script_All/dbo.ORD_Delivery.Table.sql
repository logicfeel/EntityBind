USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_Delivery]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_Delivery](
	[deli_idx] [int] IDENTITY(1,1) NOT NULL,
	[ord_id] [varchar](14) NOT NULL,
	[sto_id] [varchar](6) NOT NULL,
	[recipient] [nvarchar](10) NOT NULL,
	[state_cd] [char](2) NOT NULL,
	[method_cd] [char](3) NOT NULL,
	[choice_cd] [char](5) NOT NULL,
	[base_mn] [int] NOT NULL,
	[zipcode] [varchar](7) NULL,
	[addr1] [nvarchar](50) NULL,
	[addr2] [nvarchar](50) NULL,
	[tel] [varchar](15) NULL,
	[memo] [nvarchar](50) NULL,
	[request_dt] [smalldatetime] NULL,
	[invoice] [varchar](20) NULL,
	[dco_idx] [int] NULL,
	[send_dt] [datetime] NULL,
	[del_yn] [char](1) NOT NULL,
 CONSTRAINT [PK__ORD_Deli__3B02C83A379037E3] PRIMARY KEY CLUSTERED 
(
	[deli_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_Delivery] ADD  CONSTRAINT [DF__ORD_Deliv__del_y__35A7EF71]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[ORD_Delivery]  WITH CHECK ADD  CONSTRAINT [FK__ORD_Deliv__dco_i__44B528D7] FOREIGN KEY([dco_idx])
REFERENCES [dbo].[ORD_DeliCorp] ([dco_idx])
GO
ALTER TABLE [dbo].[ORD_Delivery] CHECK CONSTRAINT [FK__ORD_Deliv__dco_i__44B528D7]
GO
ALTER TABLE [dbo].[ORD_Delivery]  WITH CHECK ADD  CONSTRAINT [FK__ORD_Deliv__ord_i__43C1049E] FOREIGN KEY([ord_id])
REFERENCES [dbo].[ORD_Master] ([ord_id])
GO
ALTER TABLE [dbo].[ORD_Delivery] CHECK CONSTRAINT [FK__ORD_Deliv__ord_i__43C1049E]
GO
