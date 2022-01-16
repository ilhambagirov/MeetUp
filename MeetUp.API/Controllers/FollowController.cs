using MeetUp.Application.Modules.FollowersModules;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggleCommand { TargetUserName = username }));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> FollowList(string predicate, string username)
        {
            return HandleResult(await Mediator.Send(new FollowListQuery { Predicate = predicate, UserName = username }));
        }
    }
}
