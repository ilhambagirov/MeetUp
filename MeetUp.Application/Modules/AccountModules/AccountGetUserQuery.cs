using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountGetUserQuery : IRequest<Result<AppUserDto>>
    {
        public string UserName { get; set; }
    }
    public class AccountGetUserQueryHandler : IRequestHandler<AccountGetUserQuery, Result<AppUserDto>>
    {
        private readonly AppDbContext db;
        private readonly IMapper mapper;

        public AccountGetUserQueryHandler(AppDbContext db,
           IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
        public async Task<Result<AppUserDto>> Handle(AccountGetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await db.Users.ProjectTo<AppUserDto>(mapper.ConfigurationProvider).SingleOrDefaultAsync(x => x.UserName == request.UserName);
            if (user == null) return null;

            return Result<AppUserDto>.Success(user);
        }
    }
}
