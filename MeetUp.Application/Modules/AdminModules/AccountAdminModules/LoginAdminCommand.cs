using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Helpers;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AdminModules.AccountAdminModules
{
    public class LoginAdminCommand : IRequest<Result<UserDto>>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class AccountLoginCommandHandler : IRequestHandler<LoginAdminCommand, Result<UserDto>>
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IActionContextAccessor ctx;
        private readonly AppDbContext db;

        public AccountLoginCommandHandler(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor,
           IActionContextAccessor ctx,
           AppDbContext db)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.ctx = ctx;
            this.db = db;
        }
        public async Task<Result<UserDto>> Handle(LoginAdminCommand request, CancellationToken cancellationToken)
        {

            var user = await userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
            {
                ctx.IsModelState().AddModelError("User", "User Not found!");
                return null;
            }
            var isconfirmed = user.EmailConfirmed;
            if (isconfirmed == false)
            {
                ctx.IsModelState().AddModelError("email", "Email Not Confirmed yet!");
                return null;
            }

            var rIds = db.UserRoles.Where(ur => ur.UserId == user.Id).Select(ur => ur.RoleId).ToArray();

            var otherRoles = db.Roles.Where(r => !r.NormalizedName.Equals("User") && rIds.Contains(r.Id)).Any();

            if (otherRoles == false)
            {
                ctx.IsModelState().AddModelError("Admin", "You do not have Permission to Login!");
                return null;
            }
            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (result.Succeeded)
            {
                return Result<UserDto>.Success(user.CreateUserObjectModel(httpContextAccessor.HttpContext));
            }
            ctx.IsModelState().AddModelError("Admin", "You do not have Permission to Login!");
            return null;
        }
    }
}
