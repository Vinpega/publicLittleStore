using LittleStore1.Data.DataContext;
using LittleStore1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleStore1.Bussiness
{
    public class TiendaRepository : IGenericRepository<Tienda>
    {
        private readonly LittleStoreContext context;

        public TiendaRepository(LittleStoreContext _context) {
            this.context = _context;
        }
        public async Task<bool> Delete(string Id)
        {
            var articulo = this.context.Tiendas.First(x => x.Sucursal == Id);
            this.context.Tiendas.Remove(articulo);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<Tienda> Get(string Id)
        {
            return await this.context.Tiendas.FindAsync(Id);
        }

        public async Task<IQueryable<Tienda>> GetAll()
        {
            IQueryable<Tienda> queryTiendaSQL = this.context.Tiendas;
            return queryTiendaSQL.AsQueryable();
        }

        public async Task<bool> Insert(Tienda model)
        {
            this.context.Tiendas.Add(model);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Update(Tienda model)
        {
            this.context.Tiendas.Update(model);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
