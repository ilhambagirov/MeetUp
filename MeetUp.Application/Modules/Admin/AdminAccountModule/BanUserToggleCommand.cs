using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.Admin.AdminAccountModule
{
    public class BanUserToggleCommand : IRequest<Result<Unit>>
    {
        public string UserName { get; set; }
    }
    public class FollowToggleCommandHandler : IRequestHandler<BanUserToggleCommand, Result<Unit>>
    {
        private readonly AppDbContext db;
        private readonly UserManager<AppUser> userManager;
        public FollowToggleCommandHandler(UserManager<AppUser> userManager,
           AppDbContext db)
        {
            this.userManager = userManager;
            this.db = db;
        }
        public async Task<Result<Unit>> Handle(BanUserToggleCommand request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByNameAsync(request.UserName);
            if (user == null) return null;

            if (user.IsBanned == true)
            {
                user.IsBanned = false;
            }
            else
            {
                user.IsBanned = true;
            }
            var result = await db.SaveChangesAsync() > 0;
            if (result) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Failed to ban User!");

        }
    }
}
