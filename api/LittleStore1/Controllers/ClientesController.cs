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
    public class ClientesController : ControllerBase
    {
        IGenericRepository<Cliente> _clientes;

        public ClientesController(IGenericRepository<Cliente> clientes)
        {
            _clientes = clientes;
        }


        // GET: api/<ClientesController>
        [HttpGet]
        public async Task<IEnumerable<Cliente>> GetAll()
        {
            var result = await this._clientes.GetAll();
            return result;
        }

        // GET api/<ClientesController>/5
        [HttpGet("{id}")]
        public async Task<Cliente> Get(string id)
        {
            return await this._clientes.Get(id);
        }

        // POST api/<ClientesController>
        [HttpPost]
        public async Task<bool> Post([FromBody] Cliente model)
        {
            return await this._clientes.Insert(model);
        }

        // PUT api/<ClientesController>/5
        [HttpPut("{id}")]
        public Task<bool> Put([FromBody] Cliente model)
        {
            return this._clientes.Update(model);
        }

        // DELETE api/<ClientesController>/5
        [HttpDelete("{id}")]
        public Task<bool> Delete(string id)
        {
            return this._clientes.Delete(id);
        }
    }
}
