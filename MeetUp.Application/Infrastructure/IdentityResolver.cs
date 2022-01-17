using AutoMapper;
using MeetUp.Application.Interfaces;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using Microsoft.AspNetCore.Identity;

namespace MeetUp.Application.Infrastructure
{
    public class IdentityResolver : IValueResolver<PostDto, Post, string>
    {
        private readonly IUserAccessor userAccessor;
        private readonly UserManager<AppUser> userManager;

        public IdentityResolver(IUserAccessor userAccessor,UserManager<AppUser> userManager)
        {
            this.userAccessor = userAccessor;
            this.userManager = userManager;
        }
        public string Resolve(PostDto source, Post destination, string userName, ResolutionContext context)
        {
            return userAccessor.GetUsername();
        }
    }
}
