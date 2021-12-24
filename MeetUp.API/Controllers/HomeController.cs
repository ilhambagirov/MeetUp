using MediatR;
using MeetUp.Application.Modules.PostModules;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Mvc;
using System;
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
        public async Task<IActionResult> PostCreateAsync(PostCreateCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut("posts/{id}")]
        public async Task<IActionResult> PostEditAsync([FromRoute] int id, PostDto post)
        {
            return HandleResult(await Mediator.Send(new PostEditCommand { Id = id, Title = post.Title, FilePath = post.FilePath }));
        }

        [HttpDelete("posts/{id}")]
        public async Task<IActionResult> PostDeleteAsync([FromRoute] PostDeleteCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
