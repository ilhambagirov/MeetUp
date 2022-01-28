using MeetUp.Application.Modules.AccountModules;
using MeetUp.Application.Modules.AdminModules.AccountAdminModules;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers.Admin
{
    public class AccountAdminController : BaseApiController
    {
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Login(LoginAdminCommand command)
        {
            var response = await Mediator.Send(command);
            if (response == null) return ValidationProblem();
            return Ok(response.Value);
        }
    }
}
