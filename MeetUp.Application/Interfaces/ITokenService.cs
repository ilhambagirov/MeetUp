using MeetUp.Domain.Models.Entities;

namespace MeetUp.Application.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
