using LittleStore1.Data.DataContext;
using LittleStore1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleStore1.Bussiness
{
    public class CompraRepsitory : IGenericRepository<Compra>
    {
        private readonly LittleStoreContext context;

        public CompraRepsitory(LittleStoreContext _context)
        {
            this.context = _context;
        }

        public async Task<bool> Delete(string Id)
        {
            var compra = this.context.Compras.First(x => x.Id == int.Parse(Id));
            this.context.Compras.Remove(compra);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<Compra> Get(string Id)
        {
            return await this.context.Compras.FindAsync(Id);
        }

        public async Task<IQueryable<Compra>> GetAll()
        {
            IQueryable<Compra> queryCompraSQL = this.context.Compras;
            return queryCompraSQL.AsQueryable();
        }


        public async Task<bool> Insert(Compra model)
        {
            this.context.Compras.Add(model);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Update(Compra model)
        {
            this.context.Compras.Update(model);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
