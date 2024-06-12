using System;
using System.Collections.Generic;

namespace ProyectoWeb.Models;

public partial class TbUsuario
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Correo { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Estado { get; set; }
}
