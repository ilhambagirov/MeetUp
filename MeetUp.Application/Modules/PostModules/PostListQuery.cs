using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostListQuery : IRequest<Result<List<Post>>>
    {
    }
    public class PostListQueryHandler : IRequestHandler<PostListQuery, Result<List<Post>>>
    {
        private readonly AppDbContext db;
        public PostListQueryHandler(AppDbContext db)
        {
            this.db = db;
        }
        public async Task<Result<List<Post>>> Handle(PostListQuery request, CancellationToken cancellationToken)
        {
            return Result<List<Post>>.Success(await db.Posts
            .Include(x => x.CreatedByUser)
            .Where(x => x.DeletedDate == null)
            .AsNoTracking()
            .ToListAsync());

        }
    }
}
