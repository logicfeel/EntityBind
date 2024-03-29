USE [jns9778]
GO
/****** Object:  Table [dbo].[STO_Account]    Script Date: 2021-11-25 오후 3:58:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[STO_Account](
	[sto_id] [varchar](6) NOT NULL,
	[acc_idx] [int] IDENTITY(1,1) NOT NULL,
	[adm_id] [varchar](20) NOT NULL,
	[passwd] [varchar](20) NOT NULL,
	[del_yn] [char](1) NOT NULL,
	[create_dt] [datetime] NOT NULL,
	[admName] [nvarchar](10) NOT NULL,
	[use_yn] [char](1) NOT NULL,
 CONSTRAINT [PK__STO_Acco__EB6D5D39338A9CD5] PRIMARY KEY CLUSTERED 
(
	[acc_idx] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[STO_Account] ADD  CONSTRAINT [DF__STO_Accou__del_y__2FBA0BF1]  DEFAULT ('N') FOR [del_yn]
GO
ALTER TABLE [dbo].[STO_Account] ADD  CONSTRAINT [DF__STO_Accou__creat__30AE302A]  DEFAULT (getdate()) FOR [create_dt]
GO
ALTER TABLE [dbo].[STO_Account] ADD  CONSTRAINT [DF__STO_Accou__use_y__31A25463]  DEFAULT ('Y') FOR [use_yn]
GO
ALTER TABLE [dbo].[STO_Account]  WITH CHECK ADD  CONSTRAINT [FK__STO_Accou__sto_i__58BC2184] FOREIGN KEY([sto_id])
REFERENCES [dbo].[STO_Master] ([sto_id])
GO
ALTER TABLE [dbo].[STO_Account] CHECK CONSTRAINT [FK__STO_Accou__sto_i__58BC2184]
GO
