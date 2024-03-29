USE [jns9778]
GO
/****** Object:  Table [dbo].[MEB_Master]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEB_Master](
	[meb_idx] [int] IDENTITY(1,1) NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[mebName] [nvarchar](10) NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[update_dt] [datetime] NULL,
	[state_cd] [char](1) NOT NULL,
	[sto_id] [varchar](6) NOT NULL,
 CONSTRAINT [PK__MEB_M_Ba__CE90273B1CDC41A7] PRIMARY KEY CLUSTERED 
(
	[meb_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MEB_Master] ADD  CONSTRAINT [DF__MEB_M_Bas__del_y__19FFD4FC]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[MEB_Master] ADD  CONSTRAINT [DF__MEB_M_Bas__creat__1AF3F935]  DEFAULT (getdate()) FOR [create_dt]
GO
