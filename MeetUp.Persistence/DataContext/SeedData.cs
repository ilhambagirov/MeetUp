using MeetUp.Domain.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetUp.Persistence.DataContext
{
    public class SeedData
    {
        public static async Task CreateSeedData(AppDbContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Posts.Any())
            {
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
