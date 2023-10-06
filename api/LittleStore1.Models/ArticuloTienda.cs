using System;
using System.Collections.Generic;

namespace LittleStore1.Models;

public partial class ArticuloTienda
{
    public int Id { get; set; }

    public string CodigoArticulo { get; set; } = null!;

    public string TiendaSucursal { get; set; } = null!;

    public DateTime Fecha { get; set; }

    public virtual Articulo CodigoArticuloNavigation { get; set; } = null!;

    public virtual Tienda TiendaSucursalNavigation { get; set; } = null!;
}
