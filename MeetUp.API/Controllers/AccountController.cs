﻿using MediatR;
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
        [AllowAnonymous]
        [HttpGet("SearchUser/{DisplayName}")]
        public async Task<ActionResult<UserDto>> SearchUser(string DisplayName)
        {
            return HandleResult(await Mediator.Send(new UserSearchQuery() { DisplayName = DisplayName }));
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrenUser()
        {
            var response = await mediator.Send(new AccountGetUserQuery());
            if (response == null) return NotFound("User Not Found");
            return Ok(response);
        }

    }
}
