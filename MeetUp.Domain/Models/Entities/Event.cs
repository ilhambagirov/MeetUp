using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetUp.Domain.Models.Entities
{
    class Event :BaseEntity
    {
        public string Title { get; set; }
        public string Location { get; set; }
        public string FilePath { get; set; }
    }
}
