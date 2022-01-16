using MeetUp.Domain.Models.Entities;
using System.Collections.Generic;

namespace MeetUp.Domain.Models.EntityDtos
{
    public class PostDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string CreatedByUserId { get; set; }
        public virtual AppUserDto CreatedByUser { get; set; }
        public virtual ICollection<CommentDto> Comments { get; set; }
    }
}
