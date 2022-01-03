using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PhotoModules
{
    public class SetMainPhotoCommand : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
    }

    public class SetMainPhotoCommandHandler : IRequestHandler<SetMainPhotoCommand, Result<Unit>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor userAccessor;
        private readonly IPhotoAccessor photoAccessor;

        public SetMainPhotoCommandHandler(AppDbContext db,
            IUserAccessor userAccessor,
            IPhotoAccessor photoAccessor)
        {
            this.db = db;
            this.userAccessor = userAccessor;
            this.photoAccessor = photoAccessor;
        }
        public async Task<Result<Unit>> Handle(SetMainPhotoCommand request, CancellationToken cancellationToken)
        {
            var user = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());
            if (user == null) return null;

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
            if (photo == null) return null;

            var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMainPhoto != null) currentMainPhoto.IsMain = false;
            var a = currentMainPhoto;

            photo.IsMain = true;
            var success = await db.SaveChangesAsync(cancellationToken) > 0;
            if (success) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Failed to set main Photo");

        }
    }
}
