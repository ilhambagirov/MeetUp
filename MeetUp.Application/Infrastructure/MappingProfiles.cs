using AutoMapper;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetUp.Application.Infrastructure
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Post, PostDto>();
        }
    }
}
