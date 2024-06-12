using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoWeb.Models;

namespace ProyectoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly BbbventasContext _dbContext;

        public DashboardController(BbbventasContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("Barchart")]
        public async Task<IActionResult> Barchart()
        {
            var resultados = _dbContext.TbVentas
                            .Join(_dbContext.TbClientes,
                                  venta => venta.Cliente,
                                  cliente => cliente.Id,
                                  (venta, cliente) => new { ClienteNombre = cliente.Nombre + " " + cliente.Apellido, venta.Total })
                            .GroupBy(resultado => resultado.ClienteNombre)
                            .Select(grupo => new { Nombre = grupo.Key, Total = grupo.Sum(resultado => resultado.Total) })
                            .Take(5)
                            .ToList();
            return StatusCode(StatusCodes.Status200OK, resultados);
        }

        [HttpGet]
        [Route("Piechart")]
        public async Task<IActionResult> Piechart()
        {
            var resultados = _dbContext.TbDetalleVentas
                            .Join(_dbContext.TbProductos,
                                  dtventa => dtventa.ProductoId,
                                  producto => producto.Id,
                                  (dtventa, producto) => new { producto.Nombre, dtventa.Subtotal })
                            .GroupBy(resultado => resultado.Nombre)
                            .Select(grupo => new { Nombre = grupo.Key, Total = grupo.Sum(resultado => resultado.Subtotal) })
                            .Take(5)
                            .ToList();
            return StatusCode(StatusCodes.Status200OK, resultados);
        }

        [HttpGet]
        [Route("Linechart")]
        public async Task<IActionResult> Linechart()
        {
            var resultados = _dbContext.TbDetalleVentas
                            .Join(_dbContext.TbProductos,
                                  detalleVenta => detalleVenta.ProductoId,
                                  producto => producto.Id,
                                  (detalleVenta, producto) => new { CategoriaId = producto.CategoriaId, Cantidad = detalleVenta.Cantidad })
                            .Join(_dbContext.TbCategorias,
                                  detalleVentaProducto => detalleVentaProducto.CategoriaId,
                                  categoria => categoria.Id,
                                  (detalleVentaProducto, categoria) => new { CategoriaNombre = categoria.Nombre, Cantidad = detalleVentaProducto.Cantidad })
                            .GroupBy(resultado => resultado.CategoriaNombre)
                            .Select(grupo => new { Categoria = grupo.Key, Total = grupo.Sum(resultado => resultado.Cantidad) })
                            .ToList();
            return StatusCode(StatusCodes.Status200OK, resultados);
        }
    }
}
