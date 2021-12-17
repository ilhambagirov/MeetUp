using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Helpers;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountRegisterCommand : IRequest<UserDto>
    {
        public RegisterDto RegisterDto { get; set; }
    }
    public class AccountRegisterCommandHandler : IRequestHandler<AccountRegisterCommand, UserDto>
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IActionContextAccessor ctx;

        public AccountRegisterCommandHandler(UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor,
           IActionContextAccessor ctx)
        {
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.ctx = ctx;
        }
        public async Task<UserDto> Handle(AccountRegisterCommand request, CancellationToken cancellationToken)
        {

            if (await userManager.Users.AnyAsync(u => u.Email == request.RegisterDto.Email))
            {
                ctx.IsModelState().AddModelError("email", "Email Taken");
                return null;
            }

            if (await userManager.Users.AnyAsync(u => u.NormalizedUserName == request.RegisterDto.UserName.ToUpper()))
            {
                ctx.IsModelState().AddModelError("username", "Username Taken");
                return null;
            }

            var user = new AppUser
            {
                DsiplayName = request.RegisterDto.DisplayName,
                UserName = request.RegisterDto.UserName,
                Email = request.RegisterDto.Email
            };

            var result = await userManager.CreateAsync(user, request.RegisterDto.Password);

            if (result.Succeeded)
            {
                return user.CreateUserObjectModel(httpContextAccessor.HttpContext);
            }

            ctx.IsModelState().AddModelError("General", "Problem While Processing!");
            return null;

        }
    }
}
