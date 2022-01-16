using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.CommentModules
{
    public class CommentListQuery : IRequest<Result<List<CommentDto>>>
    {
        public int PostId { get; set; }
    }
    public class CommentListQueryHandler : IRequestHandler<CommentListQuery, Result<List<CommentDto>>>
    {
        private readonly AppDbContext db;
        private readonly IMapper mapper;

        public CommentListQueryHandler(AppDbContext db,
            IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
        public async Task<Result<List<CommentDto>>> Handle(CommentListQuery request, CancellationToken cancellationToken)
        {
            var comment = await db.Comments
            .Include(x => x.CreatedByUser)
            .ThenInclude(u => u.Photos)
            .Where(x => x.DeletedDate == null && x.Post.Id == request.PostId)
            .OrderBy(x=>x.CreatedDate)
            .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
            .OrderByDescending(x=>x.CreatedDate)
            .ToListAsync();

            return Result<List<CommentDto>>.Success(comment);

        }
    }
}
