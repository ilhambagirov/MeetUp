using AutoMapper;
using MediatR;
using MeetUp.Application.Extensions;
using MeetUp.Application.Infrastructure;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.Responses;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MeetUp.Application.Modules.NotificationModule
{
    public class NatificationListQuery : IRequest<Result<PagedList<NotificationDto, Notification>>>
    {
        public PagingParams Params { get; set; }
    }
    public class PostListQueryHandler : IRequestHandler<NatificationListQuery, Result<PagedList<NotificationDto, Notification>>>
    {
        private readonly AppDbContext db;
        private readonly IMapper mapper;
        private readonly IUserAccessor userAccessor;

        public PostListQueryHandler(AppDbContext db,
            IMapper mapper, IUserAccessor userAccessor)
        {
            this.db = db;
            this.mapper = mapper;
            this.userAccessor = userAccessor;
        }
        public async Task<Result<PagedList<NotificationDto, Notification>>> Handle(NatificationListQuery request, CancellationToken cancellationToken)
        {
            var notifications = db.Notifications.Include(x => x.FromUser).ThenInclude(x=>x.Photos).Include(x => x.Post).Include(x => x.NotificationType).Where(x => x.ToUser.Email == userAccessor.GetUsername())
                 .OrderByDescending(x => x.CreatedDate)
            .AsNoTracking().AsQueryable(); ;

            var notes = await notifications.PaginatedMappedListAsync<NotificationDto, Notification>(mapper, request.Params.PageIndex, request.Params.PageSize);

            return Result<PagedList<NotificationDto, Notification>>.Success(notes);
        }
    }
}
