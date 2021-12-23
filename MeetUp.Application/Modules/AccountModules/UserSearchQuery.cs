using AutoMapper;
using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class UserSearchQuery : IRequest<Result<List<AppUserDto>>>
    {
        public string DisplayName { get; set; }
    }
    public class UserSearchQueryHandler : IRequestHandler<UserSearchQuery, Result<List<AppUserDto>>>
    {
        private readonly AppDbContext db;
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IMapper mapper;

        public UserSearchQueryHandler(AppDbContext db,
            UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor,
           IMapper mapper)
        {
            this.db = db;
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
        }
        public async Task<Result<List<AppUserDto>>> Handle(UserSearchQuery request, CancellationToken cancellationToken)
        {
            var usersList = mapper.Map<List<AppUserDto>>(await db.Users.Where(x => x.DsiplayName.Contains(request.DisplayName)).ToListAsync());
            if (usersList == null) return null;

            var users = new List<AppUser>();
            foreach (var user in usersList)
            {
                users.Add(await userManager.FindByNameAsync(user.Username));
            }

            var SearchedUsers = new List<AppUserDto>();
            foreach (var user in usersList)
            {
                SearchedUsers.Add(mapper.Map<AppUserDto>(users));
            }
            return Result<List<AppUserDto>>.Success(SearchedUsers);
        }
    }
}
