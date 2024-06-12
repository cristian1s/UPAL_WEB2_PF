using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoWeb.Models;

namespace ProyectoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {

        private readonly BbbventasContext _dbContext;

        public ProductoController(BbbventasContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> Listar()
        {
                var lista = _dbContext.TbProductos
                .Join(_dbContext.TbSubcategorias, p => p.SubcategoriaId, s => s.Id, (p, s) => new { Producto = p, Subcategoria = s })
                .Join(_dbContext.TbMarcas, ps => ps.Producto.MarcaId, m => m.Id, (ps, m) => new { ps.Producto, ps.Subcategoria, Marca = m })
                .Select(result => new
                {
                    Id = result.Producto.Id,
                    Caracteristicas = result.Producto.Caracteristicas,
                    Nombre = result.Producto.Nombre,
                    Precio = result.Producto.Precio,
                    Stock = result.Producto.Stock,
                    NombreSubcategoria = result.Subcategoria.Nombre,
                    NombreMarca = result.Marca.Nombre,
                    Estado = result.Producto.Estado
                })
                .ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] TbProducto request)
        {
            if (request.Id != 0)
            {

                TbProducto usuarioExistente = await _dbContext.TbProductos.FindAsync(request.Id);

                if (usuarioExistente == null)
                {
                    return NotFound();
                }

                usuarioExistente.Nombre = request.Nombre;
                usuarioExistente.Caracteristicas = request.Caracteristicas;
                usuarioExistente.Precio = request.Precio;
                usuarioExistente.Stock = request.Stock;
                usuarioExistente.SubcategoriaId = request.SubcategoriaId;
                usuarioExistente.MarcaId = request.MarcaId;
                usuarioExistente.Estado = request.Estado;

                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                string estado = (request.Estado == "Select" || request.Estado == "" || request.Estado == null) ? "ACTIVO" : request.Estado;
                request.Estado = estado;
                await _dbContext.TbProductos.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
        }

        [HttpGet]
        [Route("Buscar/{id:int}")]
        public async Task<IActionResult> Buscar(int id)
        {
            var usuario = _dbContext.TbProductos
                    .Where(p => p.Id == id)
                 .Join(_dbContext.TbSubcategorias, p => p.SubcategoriaId, s => s.Id, (p, s) => new { Producto = p, Subcategoria = s })
                 .Join(_dbContext.TbMarcas, ps => ps.Producto.MarcaId, m => m.Id, (ps, m) => new { ps.Producto, ps.Subcategoria, Marca = m })
                 .Select(result => new
                 {
                     Id = result.Producto.Id,
                     Caracteristicas = result.Producto.Caracteristicas,
                     Nombre = result.Producto.Nombre,
                     Precio = result.Producto.Precio,
                     Stock = result.Producto.Stock,
                     SubcategoriaId = result.Producto.SubcategoriaId,
                     NombreSubcategoria = result.Subcategoria.Nombre,
                     NombreMarca = result.Marca.Nombre,
                     MarcaId= result.Producto.MarcaId,
                     Estado = result.Producto.Estado
                 })
                 .FirstOrDefault();

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
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
        [Route("subcategorias")]
        public async Task<IActionResult> subcategorias()
        {
            var lista = _dbContext.TbSubcategorias.Select(x => new { Value= x.Id,Text= x.Nombre }).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
        [HttpGet]
        [Route("marcas")]
        public async Task<IActionResult> marcas()
        {
            var lista = _dbContext.TbMarcas.Select(x => new { Value= x.Id, Text=x.Nombre }).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}
