using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoWeb.Models;
using System.Text.Json;

namespace ProyectoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        private readonly BbbventasContext _dbContext;

        public VentasController(BbbventasContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> Listar()
        {

            var lista = (from v in _dbContext.TbVentas
                        join c in _dbContext.TbClientes on v.Cliente equals c.Id
                        join dt in _dbContext.TbDetalleVentas on v.Id equals dt.VentaId
                        join p in _dbContext.TbProductos on dt.ProductoId equals p.Id
                         orderby v.Fecha descending
                         select new
                        {
                            Id= v.Id,
                            Cliente = c.Nombre + " " + c.Apellido,
                            Producto = p.Nombre,
                            PrecioUnitario = dt.PrecioUnitario,
                            Cantidad = dt.Cantidad,
                            Subtotal = dt.Subtotal,
                            Fecha = v.Fecha
                        } 
                        ).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public  IActionResult Guardar([FromBody] FormDataVenta request)
        {
            //
            var venta = new TbVenta { 
                Cliente=request.clienteId,
                Total= request.total
            };

             _dbContext.TbVentas.Add(venta);
             _dbContext.SaveChanges();

            var idVenta= venta.Id;


            var detalleventa = new TbDetalleVenta
            {
                VentaId = idVenta,
                ProductoId = request.productoId,
                PrecioUnitario = request.preciounitario,
                Cantidad = request.cantidad,
                Subtotal = request.total
            };

             _dbContext.TbDetalleVentas.Add(detalleventa);
             _dbContext.SaveChanges();

            // Actualizar el stock del producto
            var producto = _dbContext.TbProductos.Find(request.productoId);
            if (producto != null)
            {
                producto.Stock -= request.cantidad;
                _dbContext.SaveChanges();
            }

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpGet]
        [Route("Buscar/{id:int}")]
        public async Task<IActionResult> Buscar(int id)
        {
            var lista = (from v in _dbContext.TbVentas
                         join c in _dbContext.TbClientes on v.Cliente equals c.Id
                         join dt in _dbContext.TbDetalleVentas on v.Id equals dt.VentaId
                         join p in _dbContext.TbProductos on dt.ProductoId equals p.Id
                         orderby v.Fecha
                         where v.Id == id
                         select new
                         {
                             clienteNombre = c.Nombre + " " + c.Apellido,
                             productoNombre = p.Nombre,
                             preciounitario = dt.PrecioUnitario,
                             cantidad = dt.Cantidad,
                             subtotal = dt.Subtotal,
                             total = v.Total,
                             fechaVenta = v.Fecha
                         })
                  .FirstOrDefault();

            if (lista == null)
            {
                return NotFound();
            }

            return Ok(lista);
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int Id)
        {
            TbProducto tbUsuario = _dbContext.TbProductos.Find(Id);
            _dbContext.TbProductos.Remove(tbUsuario);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpGet]
        [Route("productos")]
        public async Task<IActionResult> productos()
        {
            var lista = _dbContext.TbProductos.Where(x => x.Stock > 1).
                Select(x => new { Value = x.Id, Text = x.Nombre , data_r=x.Precio , data_max=x.Stock - 1 }).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
        [HttpGet]
        [Route("clientes")]
        public async Task<IActionResult> clientes()
        {
            var lista = _dbContext.TbClientes.Select(x => new { Value = x.Id, Text = x.Nombre+" "+x.Apellido }).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}
