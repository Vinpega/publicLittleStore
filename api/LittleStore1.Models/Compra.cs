using System;
using System.Collections.Generic;

namespace LittleStore1.Models;

public partial class Compra
{
    public int Id { get; set; }

    public int IdCliente { get; set; }

    public decimal Total { get; set; }

    public DateTime Fecha { get; set; }
    public bool Pagada { get; set; }

    public virtual ICollection<CompraArticulo> CompraArticulos { get; set; } = new List<CompraArticulo>();

    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}
