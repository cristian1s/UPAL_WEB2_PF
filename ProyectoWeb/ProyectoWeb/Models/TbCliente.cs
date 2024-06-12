using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbCliente
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Correo { get; set; }

    public string? Direccion { get; set; }

    public string? Estado { get; set; }

    public virtual ICollection<TbVenta> TbVenta { get; set; } = new List<TbVenta>();
}
