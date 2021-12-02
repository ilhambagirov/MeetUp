using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetUp.Domain.Models.Entities
{
    public interface IBaseEntity
    {
        public int Id { get; set; }
    }
}
