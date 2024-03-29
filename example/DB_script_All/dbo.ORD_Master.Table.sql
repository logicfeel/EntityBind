USE [jns9778]
GO
/****** Object:  Table [dbo].[ORD_Master]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORD_Master](
	[ord_id] [varchar](14) NOT NULL,
	[order_mn] [int] NOT NULL,
	[orderName] [nvarchar](10) NOT NULL,
	[state_cd] [char](2) NOT NULL,
	[email] [varchar](100) NULL,
	[orderTel] [varchar](15) NULL,
	[meb_idx] [int] NULL,
	[memo] [nvarchar](200) NULL,
	[create_dt] [datetime] NOT NULL,
	[del_yn] [char](1) NOT NULL,
 CONSTRAINT [PK__ORD_M_Ba__DC39D7DF3D491139] PRIMARY KEY CLUSTERED 
(
	[ord_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ORD_Master] ADD  CONSTRAINT [DF__ORD_M_Bas__creat__3B60C8C7]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[ORD_Master] ADD  CONSTRAINT [DF__ORD_M_Bas__del_y__3A6CA48E]  DEFAULT ('N') FOR [del_yn]
GO
