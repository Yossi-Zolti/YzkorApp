using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using YzkorApp.Infra;
using YzkorApp.Models;

namespace YzkorApp.Controllers
{
    [Route("api/controller")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IService _service;

        public HomeController(IService service)
        {
            _service = service;
        }
        [HttpGet]
        public List<Person> GetPeople()
        {
            return _service.GetAllPeople();
        }
        [HttpGet("{id:int}")]
        public async Task <List<Description>> GetDescriptions([FromRoute]int id)
        {
            
            var descriptionsById =  await _service.GetDescriptionsByPerson(id);
            return descriptionsById;
            
        }
        [HttpPost("addPerson")]
        public async Task<IActionResult> AddPerson (Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Person newPerson = await _service.AddPerson(person);
            return Ok(newPerson);
        }
        [HttpPost("addDescription")]
        public void AddDescription(Description description)
        {
            _service.AddDescription(description);
        }
    }
}
