using FluentValidation;
using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostCreateCommand : IRequest<Post>
    {
        public string Title { get; set; }
        public string FilePath { get; set; }
    }
    public class PostCreateCommandHandler : IRequestHandler<PostCreateCommand, Post>
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
        public async Task<Post> Handle(PostCreateCommand request, CancellationToken cancellationToken)
        {
            var post = new Post();

            var username = getUser.GetUsername();
            var user = userManager.FindByEmailAsync(username);

            post = new()
            {
                Title = request.Title,
                FilePath = request.FilePath,
                CreatedByUserId = user.Result.Id,
                CreatedDate = DateTime.Now,
            };

            await db.Posts.AddAsync(post);
            await db.SaveChangesAsync();
            return post;
        }
    }
}
