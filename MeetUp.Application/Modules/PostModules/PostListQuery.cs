using AutoMapper;
using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Infrastructure;
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
    public class PostListQuery : IRequest<Result<PagedList<PostDto, Post>>>
    {
        public PagingParams Params { get; set; }
    }
    public class PostListQueryHandler : IRequestHandler<PostListQuery, Result<PagedList<PostDto, Post>>>
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
        public async Task<Result<PagedList<PostDto, Post>>> Handle(PostListQuery request, CancellationToken cancellationToken)
        {
            var usersFollowing = await db.Users.FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());
            var a = db.Posts
            .Include(x => x.CreatedByUser)
            .ThenInclude(u => u.Photos)
            .Where(x => x.DeletedDate == null)
            .OrderByDescending(x=>x.CreatedDate)
            .AsNoTracking().AsQueryable();
            var list = await a.PaginatedMappedListAsync<PostDto, Post>(mapper, request.Params.PageIndex, request.Params.PageSize);

            return Result<PagedList<PostDto, Post>>.Success(list);

        }
    }
}
