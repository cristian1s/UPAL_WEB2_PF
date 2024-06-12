using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbDetalleVenta
{
    public int Id { get; set; }

    public int? VentaId { get; set; }

    public int? ProductoId { get; set; }

    public decimal? PrecioUnitario { get; set; }

    public int? Cantidad { get; set; }

    public decimal? Subtotal { get; set; }

    public virtual TbProducto? Producto { get; set; }

    public virtual TbVenta? Venta { get; set; }
}
