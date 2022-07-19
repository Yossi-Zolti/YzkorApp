using System.Collections.Generic;
using System.Threading.Tasks;
using YzkorApp.Models;

namespace YzkorApp.Infra
{
    public interface IService
    {
        Task<Person> AddPerson(Person person);
        List<Person> GetAllPeople();
        void AddDescription(Description description);
        Task <List<Description>> GetDescriptionsByPerson(int id);
    }
}
