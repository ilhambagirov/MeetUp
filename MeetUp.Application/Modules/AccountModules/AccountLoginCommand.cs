using MediatR;
using MeetUp.Application.Helpers;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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

        public AccountLoginCommandHandler(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<UserDto> Handle(AccountLoginCommand request, CancellationToken cancellationToken)
        {

            var user = await userManager.FindByEmailAsync(request.Email);

            if (user == null) return null;

            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (result.Succeeded)
            {
                return user.CreateUserObjectModel(httpContextAccessor.HttpContext);
            }

            return null;

        }
    }

}