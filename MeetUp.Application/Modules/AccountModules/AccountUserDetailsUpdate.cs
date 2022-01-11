﻿using AutoMapper;
using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountUserDetailsUpdate : IRequest<Result<AppUser>>
    {
        public UserDto UserDto { get; set; }
    }
    public class AccountUserDetailsUpdateHandler : IRequestHandler<AccountUserDetailsUpdate, Result<AppUser>>
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IMapper mapper;
        private readonly AppDbContext db;

        public AccountUserDetailsUpdateHandler(UserManager<AppUser> userManager,
           IHttpContextAccessor httpContextAccessor,
           IMapper mapper,AppDbContext db)
        {
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
            this.db = db;
        }
        public async Task<Result<AppUser>> Handle(AccountUserDetailsUpdate request, CancellationToken cancellationToken)
        {
            var userEmail = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            if (userEmail == null) return null;
            var user = await userManager.FindByEmailAsync(userEmail);

            request.UserDto.Image = user.Photos?.FirstOrDefault(x => x.IsMain)?.Url;
            request.UserDto.UserName = user.UserName;
            var currentUser = mapper.Map(request.UserDto, user);

            await userManager.UpdateAsync(currentUser);
            return Result<AppUser>.Success(currentUser);
        }
    }
}
