using AutoMapper;
using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.CommentModules
{
    public class CommentCreateCommand : IRequest<Result<CommentDto>>
    {
        public string Body { get; set; }
        public string PostId { get; set; }
    }

    public class CommentCreateCommandHandler : IRequestHandler<CommentCreateCommand, Result<CommentDto>>
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor getUser;
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public CommentCreateCommandHandler(AppDbContext db, IUserAccessor getUser, UserManager<AppUser> userManager, IMapper mapper)
        {
            this.db = db;
            this.getUser = getUser;
            this.userManager = userManager;
            this.mapper = mapper;
        }
        public async Task<Result<CommentDto>> Handle(CommentCreateCommand request, CancellationToken cancellationToken)
        {
            var post = await db.Posts.Include(x => x.Comments).FirstOrDefaultAsync(x => x.Id == Int32.Parse(request.PostId));
            if (post == null) return null;

            var user = await db.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == getUser.GetUsername());
            if (user == null) return null;

            var comment = new Comment
            {
                CreatedByUser = user,
                CreatedByUserId = user.Id,
                Post = post,
                PostId = post.Id,
                Body = request.Body
            };
            post.Comments.Add(comment);

            var result = await db.SaveChangesAsync(cancellationToken) > 0;

            if (result) return Result<CommentDto>.Success(mapper.Map<CommentDto>(comment));

            return Result<CommentDto>.Failure("Failed to create Comment");
        }
    }
}
