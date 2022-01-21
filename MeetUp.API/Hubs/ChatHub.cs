using MediatR;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Modules.CommentModules;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
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

            await Clients.Group(command.PostId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public async Task SendMessage(string username, string message)
        {
            string userId = userMangaer.FindByEmailAsync(userAccessor.GetUsername()).Result.Id;
            string friendId = userMangaer.FindByNameAsync(username).Result.Id;

            //datetime
            DateTime serverTime = DateTime.Now;
            DateTime utcTime = serverTime.ToUniversalTime();
            TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("Azerbaijan Standard Time");
            DateTime localTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, tzi);
            DateTime date = localTime;
            bool countUp = false;
            if (db.Messages.Any(m => m.ReceiverId == friendId && m.SenderId == userId && m.IsRead == false))
            {
                countUp = true;
            }

            Message newMessage = new Message()
            {
                SenderId = userId,
                ReceiverId = friendId,
                MessageText = message,
                Date = serverTime,
                IsRead = false
            };
            db.Messages.Add(newMessage);
            db.SaveChanges();
            await Clients.User(friendId).SendAsync("ReceiveMessage", newMessage, date);
            await Clients.User(friendId).SendAsync("loadMessage", newMessage, date);
        }
        public override async Task<Task> OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var postId = httpContext.Request.Query["postId"];
            var username = httpContext.Request.Query["username"];
            if (!string.IsNullOrEmpty(postId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, postId);
                var result = await mediatr.Send(new CommentListQuery { PostId = Int32.Parse(postId) });
                await Clients.Caller.SendAsync("LoadComments", result.Value);
                return base.OnConnectedAsync();
            }
            else if (!string.IsNullOrEmpty(username))
            {
                Trace.TraceInformation("MapHub started. ID: {0}", Context.ConnectionId);

                var userName = Context.User.Identity.Name; // or get it from Context.User.Identity.Name;
                List<string> existingUserConnectionIds;
                ConnectedUsers.TryGetValue(userName, out existingUserConnectionIds);

                if (existingUserConnectionIds == null)
                {
                    existingUserConnectionIds = new List<string>();
                }
                existingUserConnectionIds.Add(Context.ConnectionId);

                ConnectedUsers.TryAdd(userName, existingUserConnectionIds);

                return base.OnConnectedAsync();
            }
            return base.OnConnectedAsync();



        }
    }
}
