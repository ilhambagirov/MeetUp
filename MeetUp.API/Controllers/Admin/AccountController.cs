using MeetUp.Application.Modules.AccountModules;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers.Admin
{
   /* public class AccountController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<UserDto>> Login(AccountLoginCommand command)
        {
            var response = await Mediator.Send(command);
            if (response == null) return Unauthorized();
            if (response.UserName == null) return ValidationProblem();
            return Ok(response);
        }
    }*/
}
