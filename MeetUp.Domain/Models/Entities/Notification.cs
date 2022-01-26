using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetUp.Domain.Models.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string FromUserId { get; set; }
        [NotMapped]
        public virtual AppUser FromUser { get; set; }
        public string ToUserId { get; set; }
        [NotMapped]
        public virtual AppUser ToUser { get; set; }
        public int? PostId { get; set; }
        [NotMapped]
        public virtual Post Post { get; set; }
        public int NotificationTypeId { get; set; }
        public virtual NotificationType NotificationType { get; set; }
    }
}
