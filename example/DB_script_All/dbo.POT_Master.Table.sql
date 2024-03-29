USE [jns9778]
GO
/****** Object:  Table [dbo].[POT_Master]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POT_Master](
	[pot_id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [varchar](20) NOT NULL,
	[pointName] [nvarchar](20) NOT NULL,
	[method_cd] [char](1) NOT NULL,
	[point_it] [int] NOT NULL,
	[percent_it] [int] NOT NULL,
	[use_yn] [char](1) NOT NULL,
	[contents] [nvarchar](100) NULL,
	[del_yn] [char](1) NOT NULL,
 CONSTRAINT [PK__POT_M_Ba__8313BA4755209ACA] PRIMARY KEY CLUSTERED 
(
	[pot_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[POT_Master] ADD  CONSTRAINT [DF__POT_M_Bas__point__505BE5AD]  DEFAULT ((0)) FOR [point_it]
GO
ALTER TABLE [dbo].[POT_Master] ADD  CONSTRAINT [DF__POT_M_Bas__perse__53385258]  DEFAULT ((0)) FOR [percent_it]
GO
ALTER TABLE [dbo].[POT_Master] ADD  CONSTRAINT [DF__POT_M_Bas__use_y__515009E6]  DEFAULT ('Y') FOR [use_yn]
GO
ALTER TABLE [dbo].[POT_Master] ADD  CONSTRAINT [DF__POT_M_Bas__del_y__52442E1F]  DEFAULT ('N') FOR [del_yn]
GO
