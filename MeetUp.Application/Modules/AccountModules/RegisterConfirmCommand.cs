using AutoMapper;
using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Linq;
using System.Security.Policy;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace MeetUp.Application.Modules.AccountModules
{
    public class RegisterConfirmCommand : IRequest<UserDto>
    {
        public string Token { get; set; }
        public string UserName { get; set; }
    }
    public class RegisterConfirmCommandHandler : IRequestHandler<RegisterConfirmCommand, UserDto>
    {
        private readonly AppDbContext db;
        private readonly IActionContextAccessor ctx;
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public RegisterConfirmCommandHandler(AppDbContext db, IActionContextAccessor ctx, UserManager<AppUser> userManager, IMapper mapper)
        {
            this.db = db;
            this.ctx = ctx;
            this.userManager = userManager;
            this.mapper = mapper;
        }
        public async Task<UserDto> Handle(RegisterConfirmCommand request, CancellationToken cancellationToken)
        {
            var user = db.Users.FirstOrDefault(s => s.UserName == request.UserName);
            var token = HttpUtility.UrlDecode(request.Token);
            token = token.Replace(" ", "+");
            var userConfirmed = await userManager.VerifyUserTokenAsync(user, userManager.Options.Tokens.EmailConfirmationTokenProvider, "EmailConfirmation", token);

                if (userConfirmed == false)
                {
                    ctx.IsModelState().AddModelError("Token", "Token Error");
                    return null;
                }
                if (user.EmailConfirmed == true)
                {
                    ctx.IsModelState().AddModelError("Token", "Already Confirmed");
                    return null;
                }

                user.EmailConfirmed = true;
                await db.SaveChangesAsync();

            return mapper.Map<UserDto>(user);
        }
    }
}
