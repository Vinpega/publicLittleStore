using LittleStore1.Bussiness;
using LittleStore1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LittleStore1.Controllers
{
    [Route("api/articulo-tiendas"), Authorize]
    [ApiController]
    public class ArticuloTiendasController : ControllerBase
    {
        IGenericRepository<ArticuloTienda> _articuloTienda;

        public ArticuloTiendasController(IGenericRepository<ArticuloTienda> articuloTienda)
        {
            _articuloTienda = articuloTienda;
        }


        // GET: api/<ArticuloTiendasController>
        [HttpGet]
        public async Task<IEnumerable<ArticuloTienda>> GetAll()
        {
            var result = await this._articuloTienda.GetAll();
            return result;
        }

        // GET api/<ArticuloTiendasController>/5
        [HttpGet("{id}")]
        public async Task<ArticuloTienda> Get(string id)
        {
            return await this._articuloTienda.Get(id);
        }

        // POST api/<ArticuloTiendasController>
        [HttpPost]
        public async Task<bool> Post([FromBody] ArticuloTienda model)
        {
            model.CodigoArticuloNavigation = null;
            model.TiendaSucursalNavigation = null;
            return await this._articuloTienda.Insert(model);
        }

        // PUT api/<ArticuloTiendasController>/5
        [HttpPut("{id}")]
        public Task<bool> Put([FromBody] ArticuloTienda model)
        {
            return this._articuloTienda.Update(model);
        }

        // DELETE api/<TiendasController>/5
        [HttpDelete("{id}")]
        public Task<bool> Delete(string id)
        {
            return this._articuloTienda.Delete(id);
        }
    }
}
