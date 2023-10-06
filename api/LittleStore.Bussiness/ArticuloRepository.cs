using LittleStore1.Data.DataContext;
using LittleStore1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleStore1.Bussiness
{
    public class ArticuloRepository : IGenericRepository<Articulo>
    {
        private readonly LittleStoreContext context;

        public ArticuloRepository(LittleStoreContext _context) {
            this.context = _context;
        }
        public async Task<bool> Delete(string Id)
        {
            var articulo = this.context.Articulos.First(x => x.Codigo == Id);
            this.context.Articulos.Remove(articulo);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<Articulo> Get(string Id)
        {
            return await this.context.Articulos.FindAsync(Id);
        }

        public async Task<IQueryable<Articulo>> GetAll()
        {
            IQueryable<Articulo> queryArticuloSQL = this.context.Articulos;
            return queryArticuloSQL.AsQueryable();
        }

        public async Task<bool> Insert(Articulo model)
        {
            this.context.Articulos.Add(model);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Update(Articulo model)
        {
            this.context.Articulos.Update(model);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
