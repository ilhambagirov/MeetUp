using MeetUp.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace MeetUp.Application.Infrastructure
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpAccessor;

        public UserAccessor(IHttpContextAccessor httpAccessor)
        {
            this.httpAccessor = httpAccessor;
        }
        public string GetUsername()
        {
            var aa = httpAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            return aa;
        }
    }
}
