using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PhotoModules
{
    public class PhotoDeleteCommand : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
    }
    public class PhotoDeleteCommandHandler : IRequestHandler<PhotoDeleteCommand, Result<Unit>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor userAccessor;
        private readonly IPhotoAccessor photoAccessor;

        public PhotoDeleteCommandHandler(AppDbContext db,
            IUserAccessor userAccessor,
            IPhotoAccessor photoAccessor)
        {
            this.db = db;
            this.userAccessor = userAccessor;
            this.photoAccessor = photoAccessor;
        }
        public async Task<Result<Unit>> Handle(PhotoDeleteCommand request, CancellationToken cancellationToken)
        {
            var user = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());
            if (user == null) return null;

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

            if (photo == null) return null;
            if (photo.IsMain == true) return Result<Unit>.Failure("You can not delete the Main Photo");

            var result = await photoAccessor.DeletePhoto(request.Id);
            if (result == null) return Result<Unit>.Failure("Failed to Delete Photo from Cloudinary");

            user.Photos.Remove(photo);
            db.Photos.Remove(photo);

            var success = await db.SaveChangesAsync(cancellationToken) > 0;
            if (success) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Failed to Delete Photo from database");

        }
    }
}
