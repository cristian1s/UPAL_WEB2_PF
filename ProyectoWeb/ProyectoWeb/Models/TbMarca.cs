using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbMarca
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public string? Estado { get; set; }

    public virtual ICollection<TbModelo> TbModelos { get; set; } = new List<TbModelo>();

    public virtual ICollection<TbProducto> TbProductos { get; set; } = new List<TbProducto>();
}
