using MediatR;
using MeetUp.Application.Modules.PostModules;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly IMediator mediator;
        public HomeController(IMediator mediator)
        {
            this.mediator = mediator;
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
