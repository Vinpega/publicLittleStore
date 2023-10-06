using System;
using System.Collections.Generic;

namespace LittleStore1.Models;

public partial class Tienda
{
    public string Sucursal { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public virtual ICollection<ArticuloTienda> ArticuloTienda { get; set; } = new List<ArticuloTienda>();
}
