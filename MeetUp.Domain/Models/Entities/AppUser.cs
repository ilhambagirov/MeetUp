using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace MeetUp.Domain.Models.Entities
{
    public class AppUser : IdentityUser
    {
        public string DsiplayName { get; set; }
        public string Bio { get; set; }
        public virtual ICollection<SavedPost> SavedPosts { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
