using AutoMapper;
using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class UserProfileQuery : IRequest<Result<AppUserDto>>
    {
        public string UserName { get; set; }
    }
    public class UserProfileQueryHandler : IRequestHandler<UserProfileQuery, Result<AppUserDto>>
    {
        private readonly AppDbContext db;
        private readonly IMapper mapper;
        private readonly IUserAccessor userAccessor;

        public UserProfileQueryHandler(AppDbContext db,
           IMapper mapper,IUserAccessor userAccessor)
        {
            this.db = db;
            this.mapper = mapper;
            this.userAccessor = userAccessor;
        }
        public async Task<Result<AppUserDto>> Handle(UserProfileQuery request, CancellationToken cancellationToken)
        {
            var usersFollowing = await db.Users.FirstOrDefaultAsync(x => x.Followers.Any(x => x.Observer.Email == userAccessor.GetUsername()));
            var user = await db.Users.Include(x => x.Posts.Where(p => p.DeletedDate == null))
               .Include(x => x.Followings)
               .Include(x => x.Followers)
               .ThenInclude(x => x.Observer)
               .Include(x => x.Photos)
               .SingleOrDefaultAsync(x => x.UserName == request.UserName);
            if (user == null) return null;

            var userMapped = mapper.Map<AppUserDto>(user);

            var following = user.Followers.Any(x => x.Target.UserName == usersFollowing.UserName);
            userMapped.Following = following;

            return Result<AppUserDto>.Success(userMapped);
        }
    }
}
