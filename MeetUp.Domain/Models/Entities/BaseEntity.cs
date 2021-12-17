﻿using MeetUp.API.Dtos;
using System;

namespace MeetUp.Domain.Models.Entities
{
    public class BaseEntity : IBaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedByUserId { get; set; }
        public virtual AppUser CreatedByUser { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public string DeletedByUserId { get; set; }
    }
}