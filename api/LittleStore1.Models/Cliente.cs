using System;
using System.Collections.Generic;

namespace LittleStore1.Models;

public partial class Cliente
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public string Clave { get; set; } = null!;

    public virtual ICollection<Compra> Compras { get; set; } = new List<Compra>();
}
