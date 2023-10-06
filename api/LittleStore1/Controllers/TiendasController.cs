using LittleStore1.Bussiness;
using LittleStore1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LittleStore1.Controllers
{
    [Route("api/[controller]"), Authorize]
    [ApiController]
    public class TiendasController : ControllerBase
    {
        IGenericRepository<Tienda> _tiendas;

        public TiendasController(IGenericRepository<Tienda> tiendas)
        {
            _tiendas = tiendas;
        }


        // GET: api/<TiendasController>
        [HttpGet]
        public async Task<IEnumerable<Tienda>> GetAll()
        {
            var result = await this._tiendas.GetAll();
            return result;
        }

        // GET api/<TiendasController>/5
        [HttpGet("{id}")]
        public async Task<Tienda> Get(string id)
        {
            return await this._tiendas.Get(id);
        }

        // POST api/<TiendasController>
        [HttpPost]
        public async Task<bool> Post([FromBody] Tienda model)
        {
            return await this._tiendas.Insert(model);
        }

        // PUT api/<TiendasController>/5
        [HttpPut("{id}")]
        public Task<bool> Put([FromBody] Tienda model)
        {
            return this._tiendas.Update(model);
        }

        // DELETE api/<TiendasController>/5
        [HttpDelete("{id}")]
        public Task<bool> Delete(string id)
        {
            return this._tiendas.Delete(id);
        }
    }
}
