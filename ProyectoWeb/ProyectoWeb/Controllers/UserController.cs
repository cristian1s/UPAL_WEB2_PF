using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoWeb.Models;
using System.Diagnostics.Eventing.Reader;

namespace ProyectoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly BbbventasContext _dbContext;

        public UserController(BbbventasContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        [Route("listar")]
        public async Task<IActionResult> Listar()
        {
            List<TbUsuario> lista = _dbContext.TbUsuarios.OrderByDescending(t => t.Id).ToList();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] TbUsuario request)
        {
            if (request.Id != 0) {

                TbUsuario usuarioExistente = await _dbContext.TbUsuarios.FindAsync(request.Id);

                if (usuarioExistente == null)
                {
                    return NotFound();
                }

                usuarioExistente.Nombre = request.Nombre;
                usuarioExistente.Apellido = request.Apellido;
                usuarioExistente.Correo = request.Correo;
                usuarioExistente.Username = request.Username;
                usuarioExistente.Password = request.Password;
                usuarioExistente.Estado = request.Estado;

                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                string estado=(request.Estado == "Select" || request.Estado == "" || request.Estado==null) ? "ACTIVO":request.Estado;
                request.Estado = estado;
                await _dbContext.TbUsuarios.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
        }

        [HttpGet]
        [Route("Buscar/{id:int}")]
        public async Task<IActionResult> Buscar(int id)
        {
            TbUsuario usuario = await _dbContext.TbUsuarios.FirstOrDefaultAsync(u  => u.Id == id);

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
            TbUsuario tbUsuario = _dbContext.TbUsuarios.Find(Id);
            _dbContext.TbUsuarios.Remove(tbUsuario);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

    }
}
