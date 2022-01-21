using AutoMapper;
using MediatR;
using MeetUp.Application.Infrastructure;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostListQuery : IRequest<Result<PagedList<PostDto>>>
    {
        public PagingParams Params { get; set; }
    }
    public class PostListQueryHandler : IRequestHandler<PostListQuery, Result<PagedList<PostDto>>>
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
        public async Task<Result<PagedList<PostDto>>> Handle(PostListQuery request, CancellationToken cancellationToken)
        {
            var usersFollowing = await db.Users.FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());
            var a = db.Posts
            .Include(x => x.Comments)
            .Include(x => x.CreatedByUser)
            .ThenInclude(u => u.Photos)
            .Where(x => x.DeletedDate == null)
            .AsNoTracking().AsQueryable();
            var posts = mapper.Map<IQueryable<PostDto>>(a);

            return Result<PagedList<PostDto>>.Success(
                await PagedList<PostDto>.CreateAsync(posts, request.Params.PageNumber, request.Params.PageSize)
                );

        }
    }
}
