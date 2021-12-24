using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostDeleteCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
    }
    public class PostDeleteCommandHandler : IRequestHandler<PostDeleteCommand, Result<Unit>>
    {
        private readonly AppDbContext db;
        public PostDeleteCommandHandler(AppDbContext db)
        {
            this.db = db;
        }

        public async Task<Result<Unit>> Handle(PostDeleteCommand request, CancellationToken cancellationToken)
        {
            var post = await db.Posts.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (post == null) return null;

            post.DeletedDate = DateTime.Now;
            var result = await db.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to Delete the Post");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
