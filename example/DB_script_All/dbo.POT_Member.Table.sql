USE [jns9778]
GO
/****** Object:  Table [dbo].[POT_Member]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POT_Member](
	[meb_idx] [int] NOT NULL,
	[total_it] [int] NOT NULL,
	[update_dt] [datetime] NULL,
 CONSTRAINT [PK__POT_Memb__CE90273B5F9E293D] PRIMARY KEY CLUSTERED 
(
	[meb_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[POT_Member] ADD  CONSTRAINT [DF__POT_Membe__total__5DB5E0CB]  DEFAULT ((0)) FOR [total_it]
GO
