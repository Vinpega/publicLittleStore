using System;
using System.Collections.Generic;

namespace LittleStore1.Models;

public partial class Articulo
{
    public string Codigo { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public decimal Precio { get; set; }

    public string? Imagen { get; set; }

    public int Stock { get; set; }

    public virtual ICollection<ArticuloTienda> ArticuloTienda { get; set; } = new List<ArticuloTienda>();

    public virtual ICollection<CompraArticulo> CompraArticulos { get; set; } = new List<CompraArticulo>();
}
