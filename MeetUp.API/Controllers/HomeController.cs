using MeetUp.Application.Modules.PostModules;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers
{
    public class HomeController : BaseApiController
    {
        [HttpGet("posts")]
        public async Task<IActionResult> PostList()
        {
            return HandleResult(await Mediator.Send(new PostListQuery()));
        }
        [HttpPost("posts")]
        public async Task<IActionResult> PostCreateAsync([FromForm] PostCreateCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut("posts/{id}")]
        public async Task<IActionResult> PostEditAsync([FromRoute] int id, PostDto post)
        {
            return HandleResult(await Mediator.Send(new PostEditCommand { Id = id, Title = post.Title }));
        }

        [HttpDelete("posts/{id}")]
        public async Task<IActionResult> PostDeleteAsync([FromRoute] PostDeleteCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
