using MediatR;
using MeetUp.Application.Modules.AccountModules;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeetUp.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IMediator mediator;

        public AccountController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserDto>> Login(AccountLoginCommand command)
        {
            var response = await mediator.Send(command);
            if (response == null) return Unauthorized();
            if (response.UserName == null) return ValidationProblem();
            return Ok(response);
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(AccountRegisterCommand command)
        {
            var response = await mediator.Send(command);
            if (response == null) return ValidationProblem();
            return Ok(response);
        }

        [HttpGet("SearchUser")]
        public async Task<ActionResult<UserDto>> SearchUser()
        {
            return HandleResult(await Mediator.Send(new UserSearchQuery()));
        }

        [HttpPost("changepassword")]
        public async Task<ActionResult<UserDto>> ChangePassword(ChangePasswordCommand command)
        {
            var response = await mediator.Send(command);
            if (response == null) return ValidationProblem();
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetCurrenUser()
        {
            return HandleResult(await Mediator.Send(new AccountGetUserQuery()));
        }

        [HttpGet("userProfile/{UserName}")]
        public async Task<IActionResult> GetUserProfile([FromRoute] UserProfileQuery query)
        {
            return HandleResult(await Mediator.Send(query));
        }

        [HttpPost("updateuserdetails")]
        public async Task<IActionResult> UpdateUserDetails(UserDto user)
        {
            return HandleResult(await Mediator.Send(new AccountUserDetailsUpdate { UserDto = user }));
        }
        [AllowAnonymous]
        [HttpGet("register-email-confirm")]
        public async Task<IActionResult> RegisterConfirm([FromQuery] string token, [FromQuery] string username)
        {
            var response = await Mediator.Send(new RegisterConfirmCommand { Token = token, UserName = username });
            if (response == null) return ValidationProblem();
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(AccountResetPasswordCommand command)
        {
            var response = await Mediator.Send(command);
            if (response == null) return ValidationProblem();
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("reset-password-confirm")]
        public async Task<IActionResult> ResetPasswordConfirm([FromQuery] string token, [FromQuery] string email, ResetPassword passwordModel)
        {
            var response = await Mediator.Send(new AccountResetPassCommand
            {
                Token = token,
                Email = email,
                Password = passwordModel.Password,
                PasswordConfirm = passwordModel.PasswordConfirm
            });
            if (response == null) return ValidationProblem();
            return Ok(response);
        }
    }
}
