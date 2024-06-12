using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbSubcategoria
{
    public int Id { get; set; }

    public int? CategoriaId { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public string? Estado { get; set; }

    public virtual TbCategoria? Categoria { get; set; }

    public virtual ICollection<TbProducto> TbProductos { get; set; } = new List<TbProducto>();
}
