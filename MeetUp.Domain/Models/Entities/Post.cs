using System.Collections.Generic;

namespace MeetUp.Domain.Models.Entities
{
    public class Post :BaseEntity
    {
        public string Title { get; set; }
        public string FilePath { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<UserPost> Users { get; set; } = new List<UserPost>();
    }
}
