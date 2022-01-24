namespace MeetUp.Domain.Models.Entities
{
    public class LikedPost
    {
        public string LikerId { get; set; }
        public AppUser Liker { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
