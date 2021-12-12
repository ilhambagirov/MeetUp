using System;

namespace MeetUp.Domain.Models.Entities
{
    public class SavedPost
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
