CREATE DATABASE [LittleStore]
GO
USE [LittleStore]
GO
/****** Object:  Table [dbo].[Articulo]    Script Date: 03/10/2023 06:58:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Articulo](
	[Codigo] [varchar](20) NOT NULL,
	[Descripcion] [varchar](500) NOT NULL,
	[Precio] [numeric](10, 2) NOT NULL,
	[Imagen] [varchar](500) NULL,
	[Stock] [int] NOT NULL,
 CONSTRAINT [PK__Articulo__06370DAD80265E81] PRIMARY KEY CLUSTERED 
(
	[Codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Articulo_tienda]    Script Date: 03/10/2023 06:58:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Articulo_tienda](
	[Id] [int] NOT NULL,
	[Codigo_articulo] [varchar](20) NOT NULL,
	[Tienda_sucursal] [varchar](20) NOT NULL,
	[Fecha] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 03/10/2023 06:58:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellidos] [varchar](100) NOT NULL,
	[Direccion] [varchar](500) NOT NULL,
	[Clave] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Compra]    Script Date: 03/10/2023 06:58:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Compra](
	[Id] [int] NOT NULL,
	[Id_cliente] [int] NOT NULL,
	[Total] [numeric](10, 2) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[Pagada] [bit] NOT NULL,
 CONSTRAINT [PK__Compra__3214EC07A3D95D38] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Compra_articulo]    Script Date: 03/10/2023 06:58:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Compra_articulo](
	[Id] [int] NOT NULL,
	[Id_compra] [int] NOT NULL,
	[Codigo_articulo] [varchar](20) NOT NULL,
	[Cantidad] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tienda]    Script Date: 03/10/2023 06:58:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tienda](
	[Sucursal] [varchar](20) NOT NULL,
	[Direccion] [varchar](500) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Sucursal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Articulo_tienda]  WITH CHECK ADD  CONSTRAINT [FK__Articulo___Codig__286302EC] FOREIGN KEY([Codigo_articulo])
REFERENCES [dbo].[Articulo] ([Codigo])
GO
ALTER TABLE [dbo].[Articulo_tienda] CHECK CONSTRAINT [FK__Articulo___Codig__286302EC]
GO
ALTER TABLE [dbo].[Articulo_tienda]  WITH CHECK ADD FOREIGN KEY([Tienda_sucursal])
REFERENCES [dbo].[Tienda] ([Sucursal])
GO
ALTER TABLE [dbo].[Compra]  WITH CHECK ADD  CONSTRAINT [FK__Compra__Id_clien__30F848ED] FOREIGN KEY([Id_cliente])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[Compra] CHECK CONSTRAINT [FK__Compra__Id_clien__30F848ED]
GO
ALTER TABLE [dbo].[Compra_articulo]  WITH CHECK ADD  CONSTRAINT [FK__Cliente_a__Codig__34C8D9D1] FOREIGN KEY([Codigo_articulo])
REFERENCES [dbo].[Articulo] ([Codigo])
GO
ALTER TABLE [dbo].[Compra_articulo] CHECK CONSTRAINT [FK__Cliente_a__Codig__34C8D9D1]
GO
ALTER TABLE [dbo].[Compra_articulo]  WITH CHECK ADD  CONSTRAINT [FK__Cliente_a__Id_co__33D4B598] FOREIGN KEY([Id_compra])
REFERENCES [dbo].[Compra] ([Id])
GO
ALTER TABLE [dbo].[Compra_articulo] CHECK CONSTRAINT [FK__Cliente_a__Id_co__33D4B598]
GO

INSERT INTO Cliente VALUES(1,'Admin', 'Super','Root', 'abc123')
Go
