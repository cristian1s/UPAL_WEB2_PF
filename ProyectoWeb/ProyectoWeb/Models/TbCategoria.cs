using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbCategoria
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public string? Estado { get; set; }

    public virtual ICollection<TbProducto> TbProductos { get; set; } = new List<TbProducto>();

    public virtual ICollection<TbSubcategoria> TbSubcategoria { get; set; } = new List<TbSubcategoria>();
}
