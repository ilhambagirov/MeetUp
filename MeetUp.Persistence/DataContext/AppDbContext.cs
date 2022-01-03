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
        public DbSet<SavedPost> SavedPosts { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<SavedPost>(x => x.HasKey(aa => new { aa.AppUserId, aa.PostId }));

            builder.Entity<SavedPost>()
                                             .HasOne(u => u.AppUser)
                                             .WithMany(a => a.SavedPosts)
                                             .HasForeignKey(aa => aa.AppUserId);
            builder.Entity<SavedPost>()
                                            .HasOne(u => u.Post)
                                            .WithMany(a => a.PostsSavedByUser)
                                            .HasForeignKey(aa => aa.PostId);
        }

    }
}
