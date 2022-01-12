using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
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
        private readonly IUserAccessor userAccessor;
        private readonly IPhotoAccessor photoAccessor;

        public PostDeleteCommandHandler(AppDbContext db, IUserAccessor userAccessor,
            IPhotoAccessor photoAccessor)
        {
            this.db = db;
            this.userAccessor = userAccessor;
            this.photoAccessor = photoAccessor;
        }

        public async Task<Result<Unit>> Handle(PostDeleteCommand request, CancellationToken cancellationToken)
        {
            var user = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());
            if (user == null) return null;

            var post = await db.Posts.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (post == null) return null;

            var photo = user.Photos.FirstOrDefault(x => x.Url == post.FilePath);

            var resultPhoto = await photoAccessor.DeletePhoto(photo.Id);
            if (resultPhoto == null) return Result<Unit>.Failure("Failed to Delete Photo from Cloudinary");

            user.Photos.Remove(photo);
            db.Photos.Remove(photo);

            post.DeletedDate = DateTime.Now;
            var result = await db.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to Delete the Post");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
