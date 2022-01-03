using MeetUp.Domain.Models.Entities;

namespace MeetUp.Domain.Models.EntityDtos
{
    public class PostDto
    {
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string CreatedByUserId { get; set; }
        public virtual AppUserDto CreatedByUser { get; set; }
    }
}
