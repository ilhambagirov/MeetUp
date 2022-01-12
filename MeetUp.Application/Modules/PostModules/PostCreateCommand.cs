using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostCreateCommand : IRequest<Result<Post>>
    {
        public string Title { get; set; }
        public IFormFile File { get; set; }
    }
    public class PostCreateCommandHandler : IRequestHandler<PostCreateCommand, Result<Post>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor getUser;
        private readonly UserManager<AppUser> userManager;
        private readonly IPhotoAccessor photoAccessor;

        public PostCreateCommandHandler(AppDbContext db, IUserAccessor getUser, UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            this.db = db;
            this.getUser = getUser;
            this.userManager = userManager;
            this.photoAccessor = photoAccessor;
        }
        public async Task<Result<Post>> Handle(PostCreateCommand request, CancellationToken cancellationToken)
        {
            var user = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == getUser.GetUsername());
            if (user == null) return null;

            var photo = new Photo();

            if (request.File != null)
            {
                var photoUploadResult = await photoAccessor.AddPhoto(request.File);
                photo = new Photo
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url,
                };
                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);
            }

            var post = new Post()
            {
                Title = request.Title,
                FilePath = photo?.Url,
                CreatedByUserId = user.Id,
                CreatedDate = DateTime.Now,
            };

            await db.Posts.AddAsync(post);
            var result = await db.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Post>.Failure("Failed to Create Post");

            return Result<Post>.Success(post);
        }
    }
}
