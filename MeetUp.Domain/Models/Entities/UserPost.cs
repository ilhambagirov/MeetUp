using System;

namespace MeetUp.Domain.Models.Entities
{
    public class UserPost
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
        public bool IsHost { get; set; }
    }
}
