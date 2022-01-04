using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountGetUserQuery : IRequest<Result<AppUserDto>>
    {
    }
    public class AccountGetUserQueryHandler : IRequestHandler<AccountGetUserQuery, Result<AppUserDto>>
    {
        private readonly AppDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AccountGetUserQueryHandler(AppDbContext db,
           IMapper mapper,
           IHttpContextAccessor httpContextAccessor)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<Result<AppUserDto>> Handle(AccountGetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await db.Users.ProjectTo<AppUserDto>(mapper.ConfigurationProvider).SingleOrDefaultAsync(x => x.Email == httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email));
            if (user == null) return null;

            return Result<AppUserDto>.Success(user);
        }
    }
}
