using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
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
        public UserProfileQueryHandler(AppDbContext db,
           IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
        public async Task<Result<AppUserDto>> Handle(UserProfileQuery request, CancellationToken cancellationToken)
        {
            var user = await db.Users.Include(x => x.Posts.Where(p => p.DeletedDate == null))
               .Include(x => x.Photos)
               .SingleOrDefaultAsync(x => x.UserName == request.UserName);
            if (user == null) return null;

            return Result<AppUserDto>.Success(mapper.Map<AppUserDto>(user));
        }
    }
}
