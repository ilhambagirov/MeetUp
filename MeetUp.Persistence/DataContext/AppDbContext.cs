using MeetUp.Domain.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MeetUp.Persistence.DataContext
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<UserPost> UserPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserPost>(x => x.HasKey(aa => new { aa.AppUserId, aa.PostId }));

            builder.Entity<UserPost>()
                                             .HasOne(u => u.AppUser)
                                             .WithMany(a => a.UserPosts)
                                             .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<UserPost>()
                                             .HasOne(u => u.Post)
                                             .WithMany(a => a.Users)
                                             .HasForeignKey(aa => aa.PostId);
        }

    }
}
