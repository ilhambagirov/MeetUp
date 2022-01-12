using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Helpers;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountRegisterCommand : IRequest<UserDto>
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex!")]
        public string Password { get; set; }
    }
    public class AccountRegisterCommandHandler : IRequestHandler<AccountRegisterCommand, UserDto>
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IActionContextAccessor ctx;
        private readonly IConfiguration configuration;

        public AccountRegisterCommandHandler(UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor,
           IActionContextAccessor ctx,
           IConfiguration configuration)
        {
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.ctx = ctx;
            this.configuration = configuration;
        }
        public async Task<UserDto> Handle(AccountRegisterCommand request, CancellationToken cancellationToken)
        {

            if (await userManager.Users.AnyAsync(u => u.Email == request.Email))
            {
                ctx.IsModelState().AddModelError("email", "Email Taken");
                return null;
            }

            if (await userManager.Users.AnyAsync(u => u.NormalizedUserName == request.UserName.ToUpper()))
            {
                ctx.IsModelState().AddModelError("username", "Username Taken");
                return null;
            }

            var user = new AppUser
            {
                DsiplayName = request.DisplayName,
                UserName = request.UserName,
                Email = request.Email
            };

            var result = await userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                string path = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}/api/Account/register-email-confirm?token={token}&UserName={request.UserName}";

                var mailSent = configuration.SendEmail(request.Email, "Riode Newsletter Subscription", $"Please confirm your Email through this <a href={path}>link</a>");

                return user.CreateUserObjectModel(httpContextAccessor.HttpContext);
            }

            ctx.IsModelState().AddModelError("General", "Problem While Processing!");
            return null;

        }
    }
}
