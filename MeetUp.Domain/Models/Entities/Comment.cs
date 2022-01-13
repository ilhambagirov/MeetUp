namespace MeetUp.Domain.Models.Entities
{
    public class Comment : BaseEntity
    {
        public string Body { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
