using LittleStore1.Data.DataContext;
using LittleStore1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleStore1.Bussiness
{
    public class CompraArticuloRepository : IGenericRepository<CompraArticulo>
    {
        private readonly LittleStoreContext context;

        public CompraArticuloRepository(LittleStoreContext _context) {
            this.context = _context;
        }
        public async Task<bool> Delete(string Id)
        {
            var compraArticulo = this.context.CompraArticulos.First(x => x.Id == int.Parse(Id));
            this.context.CompraArticulos.Remove(compraArticulo);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<CompraArticulo> Get(string Id)
        {
            return await this.context.CompraArticulos.FindAsync(Id);
        }

        public async Task<IQueryable<CompraArticulo>> GetAll()
        {
            IQueryable<CompraArticulo> queryCompraArticuloSQL = this.context.CompraArticulos;
            return queryCompraArticuloSQL.AsQueryable();
        }

        public async Task<bool> Insert(CompraArticulo model)
        {
            this.context.CompraArticulos.Add(model);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Update(CompraArticulo model)
        {
            this.context.CompraArticulos.Update(model);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
