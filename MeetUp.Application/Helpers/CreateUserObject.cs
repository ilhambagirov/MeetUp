using MeetUp.Application.Interfaces;
using MeetUp.Application.Services;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace MeetUp.Application.Helpers
{
    public static class CreateUserObject
    {
    

        public static UserDto CreateUserObjectModel(this AppUser user, HttpContext context)
        {
            using (var scope = context.RequestServices.CreateScope())
            {
                var ts = scope.ServiceProvider.GetRequiredService<ITokenService>();

                return new UserDto
                {
                    DisplayName = user.DsiplayName,
                    Token = ts.CreateToken(user),
                    Image = null,
                    UserName = user.UserName
                };
            }

        }
    }
}
