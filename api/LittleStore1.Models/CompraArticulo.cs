using System;
using System.Collections.Generic;

namespace LittleStore1.Models;

public partial class CompraArticulo
{
    public int Id { get; set; }

    public int IdCompra { get; set; }

    public string CodigoArticulo { get; set; } = null!;

    public int Cantidad { get; set; }

    public virtual Articulo CodigoArticuloNavigation { get; set; } = null!;

    public virtual Compra IdCompraNavigation { get; set; } = null!;
}
