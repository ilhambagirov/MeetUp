﻿using MeetUp.Domain.Models.Entities;
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
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }
        public DbSet<Message> Messages { get; set; }

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

            builder.Entity<UserFollowing>(x => x.HasKey(aa => new { aa.ObserverId, aa.TargetId }));

            builder.Entity<UserFollowing>()
                                            .HasOne(u => u.Observer)
                                            .WithMany(a => a.Followings)
                                            .HasForeignKey(aa => aa.ObserverId)
                                            .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<UserFollowing>()
                                            .HasOne(u => u.Target)
                                            .WithMany(a => a.Followers)
                                            .HasForeignKey(aa => aa.TargetId)
                                            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Comment>()
                .HasOne(x => x.Post)
                .WithMany(x => x.Comments)
                .OnDelete(DeleteBehavior.Cascade);

        }

    }
}
