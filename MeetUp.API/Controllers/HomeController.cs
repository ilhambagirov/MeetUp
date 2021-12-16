using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.PostModules;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly AppDbContext db;
        private readonly IMediator mediator;
        private readonly IUserAccessor getUser;
        private readonly UserManager<AppUser> userManager;

        public HomeController(AppDbContext db, IMediator mediator, IUserAccessor getUser, UserManager<AppUser> userManager)
        {
            this.db = db;
            this.mediator = mediator;
            this.getUser = getUser;
            this.userManager = userManager;
        }
        [HttpGet("posts")]
        public async Task<IActionResult> PostList()
        {
            return Ok(await mediator.Send(new PostListQuery()));
        }

        [HttpPost("posts")]
        public async Task<IActionResult> PostCreateAsync(PostCreateCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpPut("posts/{id}")]
        public async Task<IActionResult> PostEditAsync([FromRoute]int id, PostDto post )
        {
            return Ok(await mediator.Send(new PostEditCommand { Id =id, Title= post.Title, FilePath= post.FilePath }));
        }

        [HttpDelete("posts/{id}")]
        public async Task<IActionResult> PostDeleteAsync([FromRoute] PostDeleteCommand command)
        {
            return Ok(await mediator.Send(command));
        }
    }
}
