using AutoMapper;
using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.FollowersModules
{
    public class FollowListQuery : IRequest<Result<List<AppUserDto>>>
    {
        public string Predicate { get; set; }
        public string UserName { get; set; }
    }

    public class FollowListQueryHandler : IRequestHandler<FollowListQuery, Result<List<AppUserDto>>>
    {
        private readonly AppDbContext db;
        private readonly IMapper mapper;
        private readonly IUserAccessor userAccessor;

        public FollowListQueryHandler(AppDbContext db,
            IMapper mapper,
            IUserAccessor userAccessor)
        {
            this.db = db;
            this.mapper = mapper;
            this.userAccessor = userAccessor;
        }
        public async Task<Result<List<AppUserDto>>> Handle(FollowListQuery request, CancellationToken cancellationToken)
        {
            var result = new List<AppUserDto>();
            var user = await db.Users.FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());

            switch (request.Predicate)
            {
                case "followers":
                    var profiles = await db.UserFollowings
                     .Include(x => x.Observer)
                     .ThenInclude(x => x.Followings)
                     .Include(x => x.Observer)
                     .ThenInclude(x => x.Followers)
                     .ThenInclude(x => x.Observer)
                     .Include(x => x.Observer)
                     .ThenInclude(x => x.Photos)
                     .Include(x => x.Target)
                     .ThenInclude(x => x.Followers)
                     .Include(x => x.Target)
                    .ThenInclude(x => x.Photos)
              .Where(x => x.Target.UserName == request.UserName)
              .ToListAsync();

                    foreach (var profile in profiles)
                    {
                        var profileMapped = mapper.Map<AppUserDto>(profile.Observer);
                        var following = profile.Observer.Followers.Any(x => x.Observer.UserName == user.UserName);
                        profileMapped.Following = following;
                        result.Add(profileMapped);
                    }
                    break;
                case "following":
                    var profiles1 = await db.UserFollowings
                    .Include(x => x.Observer)
                    .ThenInclude(x => x.Photos)
                    .Include(x => x.Target)
                    .ThenInclude(x => x.Followings)
                    .ThenInclude(x => x.Target)
                    .Include(x => x.Target)
                    .ThenInclude(x => x.Photos)
             .Where(x => x.Observer.UserName == request.UserName)
             .ToListAsync();

                    foreach (var profile in profiles1)
                    {
                        var profileMapped = mapper.Map<AppUserDto>(profile.Target);
                        var following = profile.Observer.Followings.Any(x =>x.Target.UserName != user.UserName );
                        profileMapped.Following = following;
                        result.Add(profileMapped);
                    }
                    break;
            }
            return Result<List<AppUserDto>>.Success(result);
        }
    }
}
