using AutoMapper;
using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PhotoModules
{
    public class PhotoCreateCommand : IRequest<Result<AppUserDto>>
    {
        public IFormFile File { get; set; }
    }
    public class PhotoCreateCommandHandler : IRequestHandler<PhotoCreateCommand, Result<AppUserDto>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor userAccessor;
        private readonly IPhotoAccessor photoAccessor;
        private readonly IMapper mapper;

        public PhotoCreateCommandHandler(AppDbContext db,
            IUserAccessor userAccessor,
            IPhotoAccessor photoAccessor,
            IMapper mapper)
        {
            this.db = db;
            this.userAccessor = userAccessor;
            this.photoAccessor = photoAccessor;
            this.mapper = mapper;
        }
        public async Task<Result<AppUserDto>> Handle(PhotoCreateCommand request, CancellationToken cancellationToken)
        {
            var user = await db.Users.Include(x => x.Posts.Where(p => p.DeletedDate == null)).ThenInclude(x => x.Likes)
                .Include(x => x.Posts.Where(p => p.DeletedDate == null)).ThenInclude(x => x.Comments)
               .Include(x => x.Followings)
               .Include(x => x.Followers)
               .ThenInclude(x => x.Observer).Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == userAccessor.GetUsername());
            if (user == null) return null;

            var photoUploadResult = await photoAccessor.AddPhoto(request.File);
            var photo = new Photo
            {
                Id = photoUploadResult.PublicId,
                Url = photoUploadResult.Url,
            };
            var main = user.Photos.FirstOrDefault(x => x.IsMain == true);
            if (main != null) main.IsMain = false;

            photo.IsMain = true;

            user.Photos.Add(photo);

            var result = await db.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<AppUserDto>.Failure("Failed to Create Photo");

            return Result<AppUserDto>.Success(mapper.Map<AppUserDto>(user));

        }
    }
}
