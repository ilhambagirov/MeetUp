using System;

namespace MeetUp.Domain.Models.EntityDtos
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string FromUserName { get; set; }
        public string FromUserImage { get; set; }
        public string NotificationTypeName { get; set; }
    }
}
