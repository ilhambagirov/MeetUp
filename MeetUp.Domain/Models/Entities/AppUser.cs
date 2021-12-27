﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

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
    }
}
