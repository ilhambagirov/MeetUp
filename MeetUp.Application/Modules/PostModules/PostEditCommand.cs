using MediatR;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostEditCommand : IRequest<Post>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
    }

    public class PostEditCommandHandler : IRequestHandler<PostEditCommand, Post>
    {
        private readonly AppDbContext db;

        public PostEditCommandHandler(AppDbContext db)
        {
            this.db = db;
        }
        public async Task<Post> Handle(PostEditCommand request, CancellationToken cancellationToken)
        {
            var foundPost = await db.Posts.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (foundPost == null) return null;

            foundPost.Title = request.Title;
            foundPost.FilePath = request.FilePath;
            db.Posts.Update(foundPost);
            db.SaveChanges();

            return foundPost;

        }
    }
}
