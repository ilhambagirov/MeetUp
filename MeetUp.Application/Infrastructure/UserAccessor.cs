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
            return httpAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
