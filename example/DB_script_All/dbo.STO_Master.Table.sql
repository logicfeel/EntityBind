USE [jns9778]
GO
/****** Object:  Table [dbo].[STO_Master]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[STO_Master](
	[sto_id] [varchar](6) NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[stoName] [nvarchar](20) NOT NULL,
	[create_dt] [datetime] NOT NULL,
 CONSTRAINT [PK__STO_M_Ba__7D70B2A03943762B] PRIMARY KEY CLUSTERED 
(
	[sto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[STO_Master] ADD  CONSTRAINT [DF__STO_M_Bas__del_y__36670980]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[STO_Master] ADD  CONSTRAINT [DF__STO_M_Bas__creat__375B2DB9]  DEFAULT (getdate()) FOR [create_dt]
GO
