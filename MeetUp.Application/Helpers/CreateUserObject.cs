using MeetUp.Application.Interfaces;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

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
                    DsiplayName = user.DsiplayName,
                    Token = ts.CreateToken(user),
                    Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                    UserName = user.UserName,
                    AcademicDegree = user.AcademicDegree,
                    University = user.University,
                    School = user.School,
                    Profession = user.Profession,
                    Bio = user.Bio
                };
            }

        }
    }
}
