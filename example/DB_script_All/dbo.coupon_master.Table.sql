USE [jns9778]
GO
/****** Object:  Table [dbo].[coupon_master]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[coupon_master](
	[c_id] [int] NOT NULL,
	[c_title] [varchar](30) NOT NULL,
	[c_price] [int] NOT NULL,
	[c_count] [int] NOT NULL,
	[c_no_1] [varchar](4) NOT NULL,
	[c_no_2] [varchar](4) NOT NULL,
	[c_no_3] [varchar](4) NOT NULL,
	[c_level] [int] NULL,
	[c_until_date] [varchar](8) NULL,
	[use_yn] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[c_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('') FOR [c_title]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('0') FOR [c_price]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('0') FOR [c_count]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('') FOR [c_no_1]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('') FOR [c_no_2]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('') FOR [c_no_3]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('1') FOR [c_level]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('99999999') FOR [c_until_date]
GO
ALTER TABLE [dbo].[coupon_master] ADD  DEFAULT ('Y') FOR [use_yn]
GO
