using MeetUp.Application.Modules.LikeModules;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers
{
    public class LikeController : BaseApiController
    {
        [HttpPost("{postId}")]
        public async Task<IActionResult> Like(int postId)
        {
            return HandleResult(await Mediator.Send(new LikeToggleCommand { PostId = postId }));
        }
    }
}
