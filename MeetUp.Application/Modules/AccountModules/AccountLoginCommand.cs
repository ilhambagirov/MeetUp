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
    public class AccountLoginCommand : IRequest<UserDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class AccountLoginCommandHandler : IRequestHandler<AccountLoginCommand, UserDto>
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IActionContextAccessor ctx;

        public AccountLoginCommandHandler(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor,
           IActionContextAccessor ctx)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.ctx = ctx;
        }
        public async Task<UserDto> Handle(AccountLoginCommand request, CancellationToken cancellationToken)
        {

            var user = await userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null) return null;

            var isconfirmed = user.EmailConfirmed;
            if (isconfirmed == false)
            {
                ctx.IsModelState().AddModelError("email", "Email Not Confirmed yet!");
                return new UserDto();
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (result.Succeeded)
            {
                return user.CreateUserObjectModel(httpContextAccessor.HttpContext);
            }

            return null;

        }
    }

}