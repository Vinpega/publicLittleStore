using LittleStore1.Bussiness;
using LittleStore1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LittleStore1.Controllers
{
    [Route("api/[controller]"),Authorize]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        IGenericRepository<Articulo> _articulos;

        public ArticulosController(IGenericRepository<Articulo> articulos)
        {
            _articulos = articulos;
        }


        // GET: api/<ArticulosController>
        [HttpGet]
        public async Task<IEnumerable<Articulo>> GetAll()
        {
            var result = await this._articulos.GetAll();
            return result;
        }

        // GET api/<ArticulosController>/5
        [HttpGet("{id}")]
        public async Task<Articulo> Get(string id)
        {            
            return await this._articulos.Get(id);
        }

        // POST api/<ArticulosController>
        [HttpPost]
        public async Task<bool> Post([FromBody] Articulo model)
        {
            return await this._articulos.Insert(model);
        }

        // PUT api/<ArticulosController>/5
        [HttpPut("{id}")]
        public Task<bool> Put( [FromBody] Articulo model)
        {
            return this._articulos.Update(model);
        }

        // DELETE api/<ArticulosController>/5
        [HttpDelete("{id}")]
        public Task<bool> Delete(string id)
        {
            return this._articulos.Delete(id);
        }
    }
}
