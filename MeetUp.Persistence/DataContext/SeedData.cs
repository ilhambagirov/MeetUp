using MeetUp.Domain.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetUp.Persistence.DataContext
{
    public class SeedData
    {
        public static async Task CreateSeedData(AppDbContext context,
            UserManager<AppUser> userManager
            )
        {
            if (!context.Roles.Any())
            {
                var roles = new List<AppRole>
                {
                 new AppRole()
                {
                    Name = "SuperAdmin",
                    NormalizedName = "SUPERADMIN"
                },
                new AppRole()
                {
                    Name = "User",
                    NormalizedName = "USER"
                }
                };
                foreach (var role in roles)
                {
                    context.Roles.Add(role);
                }
                await context.SaveChangesAsync();
            }
            if (!context.NotificationTypes.Any())
            {
                var notificationTypes = new List<NotificationType>
                {
                    new NotificationType
                    {
                       Name = "Chat"
                    },
                    new NotificationType
                    {
                         Name = "Comment"
                    },
                    new NotificationType
                    {
                        Name = "Like"
                    },
                };
                await context.NotificationTypes.AddRangeAsync(notificationTypes);
                await context.SaveChangesAsync();
            }

            if (!userManager.Users.Any() && !context.Posts.Any() && !context.Roles.Any())
            {
                /* var role = new RoleManager<Role>()
                 {
                     Name = "SuperAdmin"
                 };
                 var userRole = new RiodeRole()
                 {
                     Name = "User"
                 };*/
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DsiplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DsiplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DsiplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Post>
                {
                    new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                     new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                       new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                       new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                       new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                        new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                       new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                       new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                       new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                        new Post
                    {
                        Title = "Past Activity 1",
                        FilePath = "picture.png",
                        CreatedByUserId = users.FirstOrDefault().Id,
                        CreatedDate = DateTime.Now


                    },
                };

                await context.Posts.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
