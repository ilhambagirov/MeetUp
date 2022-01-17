using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostListQuery : IRequest<Result<List<PostDto>>>
    {
    }
    public class PostListQueryHandler : IRequestHandler<PostListQuery, Result<List<PostDto>>>
    {
        private readonly AppDbContext db;
        private readonly IMapper mapper;
        private readonly IUserAccessor userAccessor;

        public PostListQueryHandler(AppDbContext db,
            IMapper mapper, IUserAccessor userAccessor)
        {
            this.db = db;
            this.mapper = mapper;
            this.userAccessor = userAccessor;
        }
        public async Task<Result<List<PostDto>>> Handle(PostListQuery request, CancellationToken cancellationToken)
        {
            var usersFollowing = await db.Users.FirstOrDefaultAsync(x => x.Followers.Any(x => x.Observer.Email == userAccessor.GetUsername()));
            var posts = await db.Posts
            .Include(x => x.Comments)
            .Include(x => x.CreatedByUser)
            .ThenInclude(u => u.Photos)
            .Include(x => x.CreatedByUser)
            .ThenInclude(u => u.Followers)
            .ThenInclude(u => u.Observer)
            .Include(x => x.CreatedByUser)
            .ThenInclude(u => u.Followings)
            .Where(x => x.DeletedDate == null)
            .AsNoTracking()
            .ToListAsync();

            var postsMapped = new List<PostDto>();
            foreach (var post in posts)
            {
                var postMapped = mapper.Map<PostDto>(post);

                var following = post.CreatedByUser.Followers.Any(x => x.Target.UserName == usersFollowing.UserName);
                postMapped.CreatedByUser.Following = following;
                postsMapped.Add(postMapped);
            }
            return Result<List<PostDto>>.Success(postsMapped);

        }
    }
}
