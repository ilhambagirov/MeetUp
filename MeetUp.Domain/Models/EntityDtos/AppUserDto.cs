using MeetUp.Domain.Models.Entities;
using System.Collections.Generic;

namespace MeetUp.Domain.Models.EntityDtos
{
    public class AppUserDto
    {
        public string DsiplayName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Bio { get; set; }
        public string School { get; set; }
        public string Image { get; set; }
        public string University { get; set; }
        public string AcademicDegree { get; set; }
        public string Profession { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}
