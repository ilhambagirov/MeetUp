using AutoMapper;
using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace MeetUp.Application.Modules.AccountModules
{
    public class AccountResetPassCommand : IRequest<Result<Unit>>
    {
        [FromQuery]
        public string Token { get; set; }
        [FromQuery]
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
    }
    public class AccountResetPassCommandHandler : IRequestHandler<AccountResetPassCommand, Result<Unit>>
    {
        private readonly AppDbContext db;
        private readonly IActionContextAccessor ctx;
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public AccountResetPassCommandHandler(AppDbContext db, IActionContextAccessor ctx, UserManager<AppUser> userManager, IMapper mapper)
        {
            this.db = db;
            this.ctx = ctx;
            this.userManager = userManager;
            this.mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(AccountResetPassCommand request, CancellationToken cancellationToken)
        {
            var user = db.Users.FirstOrDefault(s => s.Email == request.Email);
            var token = request.Token.Replace(' ', '+');
            if (request.Password != request.PasswordConfirm)
            {
                ctx.IsModelState().AddModelError("Password", "Password not valid");
                return null;
            }
          
                var a = await userManager.ResetPasswordAsync(user, token, request.Password);

            if (!a.Succeeded)
            {
                ctx.IsModelState().AddModelError("Token", "Resend a new link via your email!");
                return null;
            }
            await db.SaveChangesAsync();
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
