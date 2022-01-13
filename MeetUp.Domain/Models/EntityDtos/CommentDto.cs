using System;

namespace MeetUp.Domain.Models.EntityDtos
{
    public class CommentDto
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Body { get; set; }
        public string DsiplayName { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
    }
}
