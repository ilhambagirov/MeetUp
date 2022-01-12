using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Modules.Responses;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.AccountModules
{
    public class RegisterConfirmCommand : IRequest<Result<Unit>>
    {
        public string Token { get; set; }
        public string UserName { get; set; }
    }
    public class RegisterConfirmCommandHandler : IRequestHandler<RegisterConfirmCommand, Result<Unit>>
    {
        private readonly AppDbContext db;
        private readonly IActionContextAccessor ctx;

        public RegisterConfirmCommandHandler(AppDbContext db, IActionContextAccessor ctx)
        {
            this.db = db;
            this.ctx = ctx;
        }
        public async Task<Result<Unit>> Handle(RegisterConfirmCommand request, CancellationToken cancellationToken)
        {
            if (request.Token != null)
            {
                var user = db.Users.FirstOrDefault(s => s.UserName == request.UserName);

                if (user == null)
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
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
