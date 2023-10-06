using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System;
using LittleStore1.Bussiness;
using LittleStore1.Models;

namespace LittleStore1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _configuration;
        private IGenericRepository<Cliente> _userRepo;

        public LoginController(
            IConfiguration config,
            IGenericRepository<Cliente> userRepo
        )
        {
            this._configuration = config;
            _userRepo = userRepo;
        }

        // POST api/<LoginController>
        [HttpPost]
        public async Task<IActionResult> Post(LoginInfo logInfo)
        {
            if (logInfo.LogUser != null && logInfo.LogPassword != null)
            {
                var user = await ((ClienteRepository)this._userRepo).LoginRequest(logInfo.LogUser, logInfo.LogPassword);

                if (user != null)
                {//User found.

                    // 1.Create security token handler.
                    var tokenHandler = new JwtSecurityTokenHandler();

                    // 2. Create Private Key to Encrypted
                    var tokenKey = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

                    Claim[] claims = new Claim[]{
                        new Claim("sub",user.Id.ToString()),
                        new Claim("name",user.Nombre)
                    };

                    //TODO: Set correct expires time.
                    var tokenDescriptor = new SecurityTokenDescriptor()
                    {
                        Subject = new ClaimsIdentity(claims),
                        Expires = DateTime.UtcNow.AddHours(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
                    };

                    //4. Create Token
                    var token = tokenHandler.CreateToken(tokenDescriptor);

                    //5. Return Token from method.
                    return Ok(new { Token = tokenHandler.WriteToken(token) });

                }
                return NotFound("Usuario no encontrado.");
            }
            else
                return BadRequest("Datos incorrectos");
        }
    }
}

