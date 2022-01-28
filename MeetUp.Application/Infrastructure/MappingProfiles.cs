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
            CreateMap<Post, PostDto>()
                .ForMember(i => i.LikeCount, o => o.MapFrom(s => s.Likes.Count))
                .ForMember(i => i.CreatedDate, o => o.MapFrom(s => s.CreatedDate))
                .ReverseMap();
           /* CreateMap<IQueryable<Post>, IQueryable<PostDto>>()
              .ReverseMap();*/
            CreateMap<AppUser, UserDto>().ReverseMap();
            CreateMap<AppUser, UserFollowing>().ReverseMap();
            CreateMap<Notification, NotificationDto>()
                .ForMember(i => i.FromUserImage, o => o.MapFrom(s => s.FromUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(i => i.FromUserName, o => o.MapFrom(s => s.FromUser.UserName))
                .ForMember(i => i.NotificationTypeName, o => o.MapFrom(s => s.NotificationType.Name))
                .ReverseMap();

            CreateMap<AppUser, AppUserDto>()
                .ForMember(i => i.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(i => i.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(i => i.FollowingCount, o => o.MapFrom(s => s.Followings.Count));
               /* .ForMember(i => i.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUserName)));*/
            CreateMap<Comment, CommentDto>()
                .ForMember(i => i.DsiplayName, o => o.MapFrom(s => s.CreatedByUser.DsiplayName))
                .ForMember(i => i.Username, o => o.MapFrom(s => s.CreatedByUser.UserName))
                .ForMember(i => i.Image, o => o.MapFrom(s => s.CreatedByUser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
