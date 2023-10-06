using LittleStore1.Data.DataContext;
using LittleStore1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleStore1.Bussiness
{
    public class ArticuloTiendaRepository : IGenericRepository<ArticuloTienda>
    {
        private readonly LittleStoreContext context;

        public ArticuloTiendaRepository(LittleStoreContext _context) {
            this.context = _context;
        }
        public async Task<bool> Delete(string Id)
        {
            var articuloTienda = this.context.ArticuloTienda.First(x => x.Id == int.Parse(Id));
            this.context.ArticuloTienda.Remove(articuloTienda);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<ArticuloTienda> Get(string Id)
        {
            return await this.context.ArticuloTienda.FindAsync(Id);
        }

        public async Task<IQueryable<ArticuloTienda>> GetAll()
        {
            IQueryable<ArticuloTienda> queryArticuloTiendaSQL = this.context.ArticuloTienda;
            return queryArticuloTiendaSQL.AsQueryable();
        }

        public async Task<bool> Insert(ArticuloTienda model)
        {
            this.context.ArticuloTienda.Add(model);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Update(ArticuloTienda model)
        {
            this.context.ArticuloTienda.Update(model);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
