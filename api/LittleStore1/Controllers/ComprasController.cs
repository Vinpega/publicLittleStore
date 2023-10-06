using LittleStore1.Bussiness;
using LittleStore1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Win32;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Authorization;

namespace LittleStore1.Controllers
{
    [Route("api/[controller]"), Authorize]
    [ApiController]
    public class ComprasController : ControllerBase
    {
        IGenericRepository<Compra> _compras;
        IGenericRepository<Articulo> _articulos;
        IGenericRepository<CompraArticulo> _compraArticulos;

        public ComprasController(IGenericRepository<Compra> compras, 
            IGenericRepository<Articulo> articulos,
            IGenericRepository<CompraArticulo> compraArticulos)
        {
            _compras = compras;
            _articulos = articulos;
            _compraArticulos = compraArticulos;
        }

        [HttpGet]
        public async Task<IEnumerable<Compra>> GetAll()
        {
            var result = await this._compras.GetAll();
            return result;
        }

        [HttpPost]
        public async Task<bool> Post([FromBody] Compra model)
        {
            model.IdClienteNavigation = null;            
            return await this._compras.Insert(model);
        }

        [HttpPut("{id}")]
        public Task<bool> Put([FromBody] Compra model)
        {
            return this._compras.Update(model);
        }


        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = (await this._compraArticulos.GetAll())?.Where(x => x.IdCompra == int.Parse(id));
            List<string> ids = new List<string>();
            foreach (var registro in result)
            {
                var articulo = await this._articulos.Get(registro.CodigoArticulo);
                articulo.Stock += registro.Cantidad;                
                await this._articulos.Update(articulo);
                ids.Add(registro.Id.ToString());
            }
            
            foreach(var regId in ids)
            {
                await this._compraArticulos.Delete(regId);
            }
            

            return await this._compras.Delete(id);
        }


    }
}
