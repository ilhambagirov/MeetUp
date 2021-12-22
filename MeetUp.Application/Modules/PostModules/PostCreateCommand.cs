using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostCreateCommand : IRequest<Result<Post>>
    {
        public string Title { get; set; }
        public string FilePath { get; set; }
    }
    public class PostCreateCommandHandler : IRequestHandler<PostCreateCommand, Result<Post>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor getUser;
        private readonly UserManager<AppUser> userManager;

        public PostCreateCommandHandler(AppDbContext db, IUserAccessor getUser, UserManager<AppUser> userManager)
        {
            this.db = db;
            this.getUser = getUser;
            this.userManager = userManager;
        }
        public async Task<Result<Post>> Handle(PostCreateCommand request, CancellationToken cancellationToken)
        {
            var username = getUser.GetUsername();
            var user = userManager.FindByEmailAsync(username);

            var post = new Post()
            {
                Title = request.Title,
                FilePath = request.FilePath,
                CreatedByUserId = user.Result.Id,
                CreatedDate = DateTime.Now,
            };

            await db.Posts.AddAsync(post);
            var result = await db.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Post>.Failure("Failed to Create Post");

            return Result<Post>.Success(post);
        }
    }
}
