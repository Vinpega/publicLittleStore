using LittleStore1.Bussiness;
using LittleStore1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LittleStore1.Controllers
{
    [Route("api/compra-articulos"), Authorize]
    [ApiController]
    public class CompraArticulosController : ControllerBase
    {
        IGenericRepository<CompraArticulo> _compraArticulos;

        public CompraArticulosController(IGenericRepository<CompraArticulo> compraArticulos, 
            IGenericRepository<Articulo> articulos)
        {
            _compraArticulos = compraArticulos;
        }

        [HttpGet]
        public async Task<IEnumerable<CompraArticulo>> GetAll()
        {
            var result = await this._compraArticulos.GetAll();
            return result;
        }

        [HttpPost]
        public async Task<bool> Post([FromBody] CompraArticulo model)
        {
            model.CodigoArticuloNavigation = null;
            model.IdCompraNavigation = null;
            return await this._compraArticulos.Insert(model);
        }

        [HttpPut("{id}")]
        public Task<bool> Put([FromBody] CompraArticulo model)
        {
            return this._compraArticulos.Update(model);
        }

        [HttpDelete("{id}")]
        public Task<bool> Delete(string id)
        {
            return this._compraArticulos.Delete(id);
        }

        //[HttpPost("vaciar-carrito/{idCompra}")]
        //public async Task<bool> VaciarCarrito(string idCompra)
        //{
        //    var result = (await this._compraArticulos.GetAll())?.Where(x => x.IdCompra == int.Parse(idCompra));
        //    foreach(var registro in result)
        //    {
        //        var articulo = await this._articulos.Get(registro.CodigoArticulo);
        //        articulo.Stock += registro.Cantidad;
        //        await this._articulos.Update(articulo);

        //        await this._compraArticulos.Delete(registro.Id.ToString());
        //    }

        //    return true;            
        //}

    }
}
