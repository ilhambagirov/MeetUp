using MediatR;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostEditCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
    }

    public class PostEditCommandHandler : IRequestHandler<PostEditCommand, int>
    {
        private readonly AppDbContext db;

        public PostEditCommandHandler(AppDbContext db)
        {
            this.db = db;
        }
        public async Task<int> Handle(PostEditCommand request, CancellationToken cancellationToken)
        {
            var foundPost = await db.Posts.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (foundPost == null) return 0;

            foundPost.Title = request.Title;
            foundPost.FilePath = request.FilePath;
            db.Posts.Update(foundPost);
            db.SaveChanges();

            return foundPost.Id;

        }
    }
}
