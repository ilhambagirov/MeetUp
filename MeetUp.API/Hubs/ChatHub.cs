using MediatR;
using MeetUp.Application.Modules.CommentModules;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace MeetUp.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediatr;

        public ChatHub(IMediator mediatr)
        {
            this.mediatr = mediatr;
        }

        public async Task SendComment(CommentCreateCommand command)
        {
            var comment = await mediatr.Send(command);

            await Clients.Group(command.PostId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var postId = httpContext.Request.Query["postId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, postId);

            var result = await mediatr.Send(new CommentListQuery { PostId = Int32.Parse(postId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}
