using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbVenta
{
    public int Id { get; set; }

    public int? Cliente { get; set; }

    public DateTime? Fecha { get; set; }

    public decimal? Total { get; set; }

    public virtual TbCliente? ClienteNavigation { get; set; }

    public virtual ICollection<TbDetalleVenta> TbDetalleVenta { get; set; } = new List<TbDetalleVenta>();
}
