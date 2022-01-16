using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            var profiles = new List<AppUserDto>();

            switch (request.Predicate)
            {
                case "followers":
                    var user = await db.Users.FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());
                    profiles = await db.UserFollowings.Where(x => x.Target.UserName == request.UserName)
                        .Select(x => x.Observer)
                        .ProjectTo<AppUserDto>(mapper.ConfigurationProvider, new {currentUserName = user.UserName})
                        .ToListAsync();
                    break;
                case "following":
                    profiles = await db.UserFollowings.Where(x => x.Observer.UserName == request.UserName)
                        .Select(x => x.Target)
                        .ProjectTo<AppUserDto>(mapper.ConfigurationProvider)
                        .ToListAsync();
                    break;
            }

            return Result<List<AppUserDto>>.Success(profiles);
        }
    }
}
