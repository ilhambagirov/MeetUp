using MeetUp.Application.Modules.PhotoModules;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers
{
    public class PhotoController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] IFormFile file)
        {
            return HandleResult(await Mediator.Send(new PhotoCreateCommand { File = file }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] PhotoDeleteCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto([FromRoute] SetMainPhotoCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
