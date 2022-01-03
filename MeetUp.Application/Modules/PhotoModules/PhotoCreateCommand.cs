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
    public class PhotoCreateCommand : IRequest<Result<Photo>>
    {
        public IFormFile File { get; set; }
    }
    public class PhotoCreateCommandHandler : IRequestHandler<PhotoCreateCommand, Result<Photo>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor userAccessor;
        private readonly IPhotoAccessor photoAccessor;

        public PhotoCreateCommandHandler(AppDbContext db,
            IUserAccessor userAccessor,
            IPhotoAccessor photoAccessor)
        {
            this.db = db;
            this.userAccessor = userAccessor;
            this.photoAccessor = photoAccessor;
        }
        public async Task<Result<Photo>> Handle(PhotoCreateCommand request, CancellationToken cancellationToken)
        {
            var user = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());
            if (user == null) return null;

            var photoUploadResult = await photoAccessor.AddPhoto(request.File);
            var photo = new Photo
            {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url,
            };

            if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

            user.Photos.Add(photo);

            var result = await db.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Photo>.Failure("Failed to Create Photo");

            return Result<Photo>.Success(photo);

        }
    }
}
