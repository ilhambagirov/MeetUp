using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MeetUp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly AppDbContext db;

        public HomeController(AppDbContext db)
        {
            this.db = db;
        }
        [HttpGet("posts")]
        public IActionResult PostList()
        {
            var posts = db.Posts
                .Include(x=>x.CreatedByUser)
                .ToList();
            return Ok(posts) ;
        }
    }
}
