using System;

namespace MeetUp.Domain.Models.Entities
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }

        public static implicit operator Photo(bool v)
        {
            throw new NotImplementedException();
        }
    }
}
