USE [jns9778]
GO
/****** Object:  Table [dbo].[PRT_Master]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRT_Master](
	[prt_id] [int] NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[update_dt] [datetime] NULL,
	[prtName] [nvarchar](30) NOT NULL,
	[type_cd] [char](2) NOT NULL,
	[sto_id] [varchar](6) NOT NULL,
 CONSTRAINT [PK__PRT_M_Ba__392CFC2617E28260] PRIMARY KEY CLUSTERED 
(
	[prt_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PRT_Master] ADD  CONSTRAINT [DF__PRT_M_Bas__del_y__150615B5]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[PRT_Master] ADD  CONSTRAINT [DF__PRT_M_Bas__creat__15FA39EE]  DEFAULT (getdate()) FOR [create_dt]
GO
