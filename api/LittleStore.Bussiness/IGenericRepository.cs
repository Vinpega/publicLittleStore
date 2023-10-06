using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleStore1.Bussiness
{
    public interface IGenericRepository<TEntityModel> where TEntityModel : class
    {
        Task<bool> Insert(TEntityModel model);
        Task<bool> Update(TEntityModel model);
        Task<bool> Delete(string Id);
        Task<TEntityModel> Get(string Id);
        Task<IQueryable<TEntityModel>> GetAll();
    }
}
