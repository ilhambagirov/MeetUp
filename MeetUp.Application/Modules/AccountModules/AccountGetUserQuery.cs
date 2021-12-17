using MediatR;
using MeetUp.Application.Helpers;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountGetUserQuery : IRequest<UserDto>
    {
    }
    public class AccountGetUserQueryHandler : IRequestHandler<AccountGetUserQuery, UserDto>
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AccountGetUserQueryHandler(UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor)
        {
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<UserDto> Handle(AccountGetUserQuery request, CancellationToken cancellationToken)
        {
            var userEmail =httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);

            if (userEmail == null) return null;
            var user = await userManager.FindByEmailAsync(userEmail);

            return user.CreateUserObjectModel(httpContextAccessor.HttpContext);
        }
    }
}
