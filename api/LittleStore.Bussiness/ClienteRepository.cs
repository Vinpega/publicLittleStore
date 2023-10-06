using LittleStore1.Data.DataContext;
using LittleStore1.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleStore1.Bussiness
{
    public class ClienteRepository : IGenericRepository<Cliente>
    {
        private readonly LittleStoreContext context;

        public ClienteRepository(LittleStoreContext _context) {
            this.context = _context;
        }
        public async Task<bool> Delete(string Id)
        {
            var cliente = this.context.Clientes.First(x => x.Id == int.Parse(Id));
            this.context.Clientes.Remove(cliente);
            await this.context.SaveChangesAsync();
            return true;
        }
        
        public async Task<Cliente> LoginRequest(string nombre, string clave)
        {
            //var result = await this.context.Clientes.FindAsync(nombre, clave);
            var result = await this.context.Clientes.FirstOrDefaultAsync(x=> x.Nombre == nombre && x.Clave == clave);
            return result;

        }

        public async Task<Cliente> Get(string Id)
        {
            return await this.context.Clientes.FindAsync(int.Parse(Id));
        }

        public async Task<IQueryable<Cliente>> GetAll()
        {
            IQueryable<Cliente> queryClienteSQL = this.context.Clientes;
            return queryClienteSQL.AsQueryable();
        }

        public async Task<bool> Insert(Cliente model)
        {
            this.context.Clientes.Add(model);
            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Update(Cliente model)
        {
            this.context.Clientes.Update(model);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
