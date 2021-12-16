using MediatR;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostListQuery : IRequest<List<Post>>
    {
    }
    public class PostListQueryHandler : IRequestHandler<PostListQuery, List<Post>>
    {
        private readonly AppDbContext db;
        public PostListQueryHandler(AppDbContext db)
        {
            this.db = db;
        }
        public async Task<List<Post>> Handle(PostListQuery request, CancellationToken cancellationToken)
        {
            var posts = await db.Posts
            .Include(x => x.CreatedByUser)
            .Where(x => x.DeletedDate == null)
            .AsNoTracking()
            .ToListAsync();
            return posts;
        }
    }
}
