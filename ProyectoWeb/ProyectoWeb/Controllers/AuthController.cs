using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoWeb.Models;

namespace ProyectoWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {


        private readonly BbbventasContext _dbContext;

        public AuthController(BbbventasContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] TbUsuario request)
        {
            var user= _dbContext.TbUsuarios.Where(x => x.Username == request.Username && x.Password == request.Password).FirstOrDefault();
            if(user == null)
            {
                return StatusCode(StatusCodes.Status204NoContent,null);
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, user);
            }
        }
    }
}
