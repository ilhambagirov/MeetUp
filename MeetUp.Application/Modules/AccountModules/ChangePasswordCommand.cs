using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class ChangePasswordCommand : IRequest<Result<Unit>>
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string NewPasswordConfirm { get; set; }
    }
    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Result<Unit>>
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IActionContextAccessor ctx;

        public ChangePasswordCommandHandler(UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor,
           IActionContextAccessor ctx)
        {
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.ctx = ctx;
        }

        public async Task<Result<Unit>> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var userEmail = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            if (userEmail == null) return null;
            var user = await userManager.FindByEmailAsync(userEmail);

            if (request.NewPassword != request.NewPasswordConfirm)
            {
                ctx.IsModelState().AddModelError("Password", "Password not valid!");
                return null;
            }

            await userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
