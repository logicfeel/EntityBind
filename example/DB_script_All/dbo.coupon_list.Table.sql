USE [jns9778]
GO
/****** Object:  Table [dbo].[coupon_list]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[coupon_list](
	[c_no] [int] NOT NULL,
	[c_id] [int] NOT NULL,
	[c_price] [int] NOT NULL,
	[m_no] [int] NOT NULL,
	[use_yn] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[c_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[coupon_list] ADD  DEFAULT ('0') FOR [c_id]
GO
ALTER TABLE [dbo].[coupon_list] ADD  DEFAULT ('0') FOR [c_price]
GO
ALTER TABLE [dbo].[coupon_list] ADD  DEFAULT ('0') FOR [m_no]
GO
ALTER TABLE [dbo].[coupon_list] ADD  DEFAULT ('N') FOR [use_yn]
GO
