using AutoMapper;
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
            IMapper mapper,IUserAccessor userAccessor)
        {
            this.db = db;
            this.mapper = mapper;
            this.userAccessor = userAccessor;
        }
        public async Task<Result<List<PostDto>>> Handle(PostListQuery request, CancellationToken cancellationToken)
        {
            var posts = await db.Posts
            .Include(x => x.Comments)
            .Include(x => x.CreatedByUser)
            .ThenInclude(u => u.Photos)
            .Where(x => x.DeletedDate == null)
            .AsNoTracking()
            .ToListAsync();

            var result = mapper.Map<List<PostDto>>(posts, opts => opts.Items["currentUserName"] = userAccessor.GetUsername());
            return Result<List<PostDto>>.Success(result);

        }
    }
}
