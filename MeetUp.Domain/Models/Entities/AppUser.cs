using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetUp.Domain.Models.Entities
{
    public class AppUser : IdentityUser
    {
        public string DsiplayName { get; set; }
        public string Bio { get; set; }
        public string School { get; set; }
        public string University { get; set; }
        public string AcademicDegree { get; set; }
        public string Profession { get; set; }
        public virtual ICollection<SavedPost> SavedPosts { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<UserFollowing> Followings { get; set; }
        public virtual ICollection<UserFollowing> Followers { get; set; }
        public virtual ICollection<LikedPost> LikedPosts { get; set; }
        [NotMapped]
        public virtual ICollection<Notification> Notifications { get; set; }
    }
}
