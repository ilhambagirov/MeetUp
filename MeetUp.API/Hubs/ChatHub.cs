using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.CommentModules;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetUp.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediatr;
        private readonly AppDbContext db;
        private readonly UserManager<AppUser> userMangaer;
        private readonly IUserAccessor userAccessor;
        /*private readonly Lazy<List<AppUser>> connectedUsers;*/

        public ChatHub(IMediator mediatr, AppDbContext db, UserManager<AppUser> userMangaer, IUserAccessor userAccessor)
        {
            this.mediatr = mediatr;
            this.db = db;
            this.userMangaer = userMangaer;
            this.userAccessor = userAccessor;
        }
        public static ConcurrentDictionary<string, List<string>> ConnectedUsers = new ConcurrentDictionary<string, List<string>>();

        public async Task SendComment(CommentCreateCommand command)
        {
            var comment = await mediatr.Send(command);

            var notType = await db.NotificationTypes.FirstOrDefaultAsync(x => x.Id == 2);
            var post = await db.Posts.FirstOrDefaultAsync(x => x.Id == Int32.Parse(command.PostId));
            var user = userMangaer.FindByEmailAsync(userAccessor.GetUsername()).Result.Id;
            Notification newNotification = new Notification()
            {
                NotificationType = notType,
                FromUserId = userMangaer.FindByEmailAsync(userAccessor.GetUsername()).Result.Id,
                ToUserId = post.CreatedByUserId,
                PostId = post.Id,
                CreatedDate = DateTime.Now
            };
            db.Notifications.Add(newNotification);
            db.SaveChanges();

            await Clients.Group(command.PostId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }
        public async Task SendNotification(string receiverId)
        {
            await Clients.User(receiverId).SendAsync("ReceiveNotification", "salam");
        }
        public async Task LoadComment(string postId)
        {
            if (!string.IsNullOrEmpty(postId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, postId);
                var result = await mediatr.Send(new CommentListQuery { PostId = Int32.Parse(postId) });
                await Clients.Caller.SendAsync("LoadComments", result.Value);
            }
        }

        public async Task SendMessage(string username, string message)
        {
            var a = userAccessor.GetUsername();
            string userId = userMangaer.FindByEmailAsync(userAccessor.GetUsername()).Result.Id;
            var friend = await userMangaer.FindByNameAsync(username);

            //datetime
            DateTime serverTime = DateTime.Now;
            DateTime utcTime = serverTime.ToUniversalTime();
            TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("Azerbaijan Standard Time");
            DateTime localTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, tzi);
            DateTime date = localTime;
            bool countUp = false;
            if (db.Messages.Any(m => m.ReceiverId == friend.Id && m.SenderId == userId && m.IsRead == false))
            {
                countUp = true;
            }

            Message newMessage = new Message()
            {
                SenderId = userId,
                ReceiverId = friend.Id,
                MessageText = message,
                Date = serverTime,
                IsRead = false
            };

            var notType = await db.NotificationTypes.FirstOrDefaultAsync(x => x.Id == 1);

            Notification newNotification = new Notification()
            {
                NotificationTypeId = notType.Id,
                FromUserId = userMangaer.FindByEmailAsync(userAccessor.GetUsername()).Result.Id,
                ToUserId = friend.Id,
                PostId = 40,
                CreatedDate = serverTime
            };
            db.Notifications.Add(newNotification);
            db.Messages.Add(newMessage);
            var t = db.SaveChanges();

            await Clients.User(friend.Id).SendAsync("ReceiveMessage", newMessage, newNotification, date);
        }
        public override async Task<Task> OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
    }
}
