using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountGetUserQuery : IRequest<Result<AppUser>>
    {
    }
    public class AccountGetUserQueryHandler : IRequestHandler<AccountGetUserQuery, Result<AppUser>>
    {
        private readonly UserManager<AppUser> userManager;
        private readonly AppDbContext db;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AccountGetUserQueryHandler(UserManager<AppUser> userManager,
            AppDbContext db,
           IHttpContextAccessor httpContextAccessor)
        {
            this.userManager = userManager;
            this.db = db;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<Result<AppUser>> Handle(AccountGetUserQuery request, CancellationToken cancellationToken)
        {
            var userEmail = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            if (userEmail == null) return null;
            var user = await userManager.FindByEmailAsync(userEmail);
            return Result<AppUser>.Success(await db.Users.Include(x => x.Posts.Where(x => x.CreatedByUserId == user.Id && x.DeletedDate == null)).FirstOrDefaultAsync(x => x.Email == userEmail));
        }
    }
}
