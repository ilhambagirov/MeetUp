using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostEditCommand : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
    }

    public class PostEditCommandHandler : IRequestHandler<PostEditCommand, Result<Unit>>
    {
        private readonly AppDbContext db;

        public PostEditCommandHandler(AppDbContext db)
        {
            this.db = db;
        }
        public async Task<Result<Unit>> Handle(PostEditCommand request, CancellationToken cancellationToken)
        {
            var foundPost = await db.Posts.FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedDate == null);
            if (foundPost == null) return null;

            foundPost.Title = request.Title;
            foundPost.FilePath = request.FilePath;
            var result = await db.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to Update the Post");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
