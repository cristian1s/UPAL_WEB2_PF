using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoWeb.Models;

namespace ProyectoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {

        private readonly BbbventasContext _dbContext;

        public ClienteController(BbbventasContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> Listar()
        {
            List<TbCliente> lista = _dbContext.TbClientes.OrderByDescending(t => t.Id).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] TbCliente request)
        {
            if (request.Id != 0)
            {

                TbCliente usuarioExistente = await _dbContext.TbClientes.FindAsync(request.Id);

                if (usuarioExistente == null)
                {
                    return NotFound();
                }

                usuarioExistente.Nombre = request.Nombre;
                usuarioExistente.Apellido = request.Apellido;
                usuarioExistente.Correo = request.Correo;
                usuarioExistente.Direccion = request.Direccion;
                usuarioExistente.Estado = request.Estado;

                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                string estado = (request.Estado == "Select" || request.Estado == "" || request.Estado == null) ? "ACTIVO" : request.Estado;
                request.Estado = estado;
                await _dbContext.TbClientes.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
        }

        [HttpGet]
        [Route("Buscar/{id:int}")]
        public async Task<IActionResult> Buscar(int id)
        {
            TbCliente usuario = await _dbContext.TbClientes.FirstOrDefaultAsync(u => u.Id == id);

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
            TbCliente tbUsuario = _dbContext.TbClientes.Find(Id);
            _dbContext.TbClientes.Remove(tbUsuario);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

    }
}
