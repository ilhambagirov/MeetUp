﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetUp.Domain.Models.Entities
{
    public class Group : BaseEntity
    {
        public string Name { get; set; }
        public string FilePath { get; set; }
        public string Description { get; set; }
    }
}
