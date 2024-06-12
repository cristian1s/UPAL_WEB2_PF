using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbModelo
{
    public int Id { get; set; }

    public int? MarcaId { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public string? Estado { get; set; }

    public virtual TbMarca? Marca { get; set; }

    public virtual ICollection<TbProducto> TbProductos { get; set; } = new List<TbProducto>();
}
