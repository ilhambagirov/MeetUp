using AutoMapper;
using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.LikeModules
{
    public class LikeToggleCommand : IRequest<Result<Unit>>
    {
        public int PostId { get; set; }
    }
    public class LikeToggleCommandHandler : IRequestHandler<LikeToggleCommand, Result<Unit>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor getUser;
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public LikeToggleCommandHandler(AppDbContext db, IUserAccessor getUser, UserManager<AppUser> userManager, IMapper mapper)
        {
            this.db = db;
            this.getUser = getUser;
            this.userManager = userManager;
            this.mapper = mapper;
        }
        public async Task<Result<Unit>> Handle(LikeToggleCommand request, CancellationToken cancellationToken)
        {
            var user = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == getUser.GetUsername());
            if (user == null) return null;

            var post = await db.Posts.FirstOrDefaultAsync(x => x.Id == request.PostId);
            if (post == null) return null;

            var liked = await db.LikedPosts.FindAsync(user.Id, post.Id);

            if (liked == null)
            {
                liked = new LikedPost
                {
                    Liker = user,
                    Post = post
                };

                db.LikedPosts.Add(liked);
            }
            else
            {
                db.LikedPosts.Remove(liked);
            }

            var result = await db.SaveChangesAsync() > 0;
            if (result) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Failed to update Like");

        }
    }
}
