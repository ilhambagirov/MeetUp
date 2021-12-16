using MediatR;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostDeleteCommand : IRequest<int>
    {
        public int Id { get; set; }
    }
    public class PostDeleteCommandHandler : IRequestHandler<PostDeleteCommand, int>
    {
        private readonly AppDbContext db;
        public PostDeleteCommandHandler(AppDbContext db)
        {
            this.db = db;
        }

        public async Task<int> Handle(PostDeleteCommand request, CancellationToken cancellationToken)
        {
            var post = await db.Posts.FirstOrDefaultAsync(x => x.Id == request.Id);
            post.DeletedDate = DateTime.Now;
            db.SaveChanges();

            return post.Id;
        }
    }
}
