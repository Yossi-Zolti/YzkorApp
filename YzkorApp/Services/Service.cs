using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YzkorApp.Data;
using YzkorApp.Infra;
using YzkorApp.Models;

namespace YzkorApp.Services
{
    public class Service : IService
    {
        private readonly MyContext _myContext;
        public Service(MyContext myContext)
        {
            _myContext = myContext;
        }

        public void AddDescription(Description description)
        {
            _myContext.Descriptions.Add(description);
            _myContext.SaveChanges();
        }

        public async Task<Person> AddPerson(Person person)
        {
            _myContext.People.Add(person);
            await _myContext.SaveChangesAsync();
            return _myContext.People.FirstOrDefault(p => p.FirstName == person.FirstName && p.LastName == person.LastName);

        }

        public List<Person> GetAllPeople()
        {
            return _myContext.People.ToList();
        }

        public async Task <List<Description>> GetDescriptionsByPerson(int id)
        {
            return _myContext.Descriptions.Where(d => id == d.PersonId).ToList();
        }
    }
}
