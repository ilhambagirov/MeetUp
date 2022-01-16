using AutoMapper;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using System.Linq;

namespace MeetUp.Application.Infrastructure
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUserName = null;
            CreateMap<Post, PostDto>()
                 .ForMember(i => i.CreatedByUser.FollowersCount, o => o.MapFrom(s => s.CreatedByUser.Followers.Count))
                .ForMember(i => i.CreatedByUser.FollowingCount, o => o.MapFrom(s => s.CreatedByUser.Followings.Count))
                .ForMember(i => i.CreatedByUser.Following, o => o.MapFrom(s => s.CreatedByUser.Followers.Any(x => x.Observer.Email == currentUserName))); ;
            CreateMap<AppUser, UserDto>().ReverseMap();

            CreateMap<AppUser, AppUserDto>()
                .ForMember(i => i.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(i => i.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(i => i.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(i => i.Following, o => o.MapFrom(s => s.Followers.Any(x=>x.Observer.UserName == currentUserName)));
            CreateMap<Comment, CommentDto>()
                .ForMember(i => i.DsiplayName, o => o.MapFrom(s => s.CreatedByUser.DsiplayName))
                .ForMember(i => i.Username, o => o.MapFrom(s => s.CreatedByUser.UserName))
                .ForMember(i => i.Image, o => o.MapFrom(s => s.CreatedByUser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
