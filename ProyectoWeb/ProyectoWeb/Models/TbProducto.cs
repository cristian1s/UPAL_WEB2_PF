using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbProducto
{
    public int Id { get; set; }

    public int? CategoriaId { get; set; }

    public int? SubcategoriaId { get; set; }

    public int? MarcaId { get; set; }

    public int? ModeloId { get; set; }

    public string? Nombre { get; set; }

    public string? Caracteristicas { get; set; }

    public decimal? Precio { get; set; }

    public decimal? Descuento { get; set; }

    public int? Stock { get; set; }

    public int? StockMinimo { get; set; }

    public int? Estrellas { get; set; }

    public string? Estado { get; set; }

    public virtual TbCategoria? Categoria { get; set; }

    public virtual TbMarca? Marca { get; set; }

    public virtual TbModelo? Modelo { get; set; }

    public virtual TbSubcategoria? Subcategoria { get; set; }

    public virtual ICollection<TbDetalleVenta> TbDetalleVenta { get; set; } = new List<TbDetalleVenta>();
}
