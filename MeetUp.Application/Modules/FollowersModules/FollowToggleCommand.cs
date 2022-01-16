using AutoMapper;
using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.FollowersModules
{
    public class FollowToggleCommand : IRequest<Result<Unit>>
    {
        public string TargetUserName { get; set; }
    }
    public class FollowToggleCommandHandler : IRequestHandler<FollowToggleCommand, Result<Unit>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor getUser;
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public FollowToggleCommandHandler(AppDbContext db, IUserAccessor getUser, UserManager<AppUser> userManager, IMapper mapper)
        {
            this.db = db;
            this.getUser = getUser;
            this.userManager = userManager;
            this.mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(FollowToggleCommand request, CancellationToken cancellationToken)
        {
            var observer = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == getUser.GetUsername());
            if (observer == null) return null;

            var target = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == request.TargetUserName);
            if (target == null) return null;

            var following = await db.UserFollowings.FindAsync(observer.Id, target.Id);

            if (following == null)
            {
                following = new UserFollowing
                {
                    Observer = observer,
                    Target = target
                };

                db.UserFollowings.Add(following);
            }
            else
            {
                db.UserFollowings.Remove(following);
            }

            var result = await db.SaveChangesAsync() > 0;
            if (result) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Failed to update follwing");
            
        }
    }
}
