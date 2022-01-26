using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountResetPasswordCommand : IRequest<Result<Unit>>
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
    public class AccountResetPasswordCommandHandler : IRequestHandler<AccountResetPasswordCommand, Result<Unit>>
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IActionContextAccessor ctx;
        private readonly IConfiguration configuration;

        public AccountResetPasswordCommandHandler(UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor,
           IActionContextAccessor ctx,
           IConfiguration configuration)
        {
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.ctx = ctx;
            this.configuration = configuration;
        }
        public async Task<Result<Unit>> Handle(AccountResetPasswordCommand request, CancellationToken cancellationToken)
        {
            var userIsIn = await userManager.FindByEmailAsync(request.Email);
            if (userIsIn == null)
            {
                ctx.IsModelState().AddModelError("Error", "Your email is not registered!");
                return null;
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(userIsIn);
            var tokenCrypted = HttpUtility.UrlEncode(token);
            string path = $"http://localhost:3000/confirmResetPassword?token={tokenCrypted}&Email={request.Email}";
            var mailSent = configuration.SendEmail(request.Email, "Riode Newsletter Subscription", $"Please confirm your Email through this <a href={path}>link</a>");

            return Result<Unit>.Success(Unit.Value);

        }
    }
}
