using System.Collections.Generic;

namespace MeetUp.Domain.Models.Entities
{
    public class Post :BaseEntity
    {
        public string Title { get; set; }
        public string FilePath { get; set; }
        public virtual ICollection<SavedPost> PostsSavedByUser { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
