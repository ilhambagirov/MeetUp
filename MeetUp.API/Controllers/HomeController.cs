using AutoMapper;
using MeetUp.API.Dtos;
using MeetUp.Application.Interfaces;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace MeetUp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly AppDbContext db;
        private readonly IUserAccessor getUser;
        private readonly UserManager<AppUser> userManager;

        public HomeController(AppDbContext db, IUserAccessor getUser, UserManager<AppUser> userManager)
        {
            this.db = db;
            this.getUser = getUser;
            this.userManager = userManager;
        }
        [HttpGet("posts")]
        public IActionResult PostList()
        {
            var posts = db.Posts
                .Include(x => x.CreatedByUser)
                .Where(x => x.DeletedDate == null)
                .AsNoTracking()
                .ToList();
            return Ok(posts);
        }

        [HttpPost("posts")]
        public IActionResult PostCreate(PostDto post)
        {
            var createdEntity = new Post();
            if (ModelState.IsValid)
            {
                var username = getUser.GetUsername();
                var user = userManager.FindByEmailAsync(username);


                createdEntity = new()
                {
                    Title = post.Title,
                    FilePath = post.FilePath,
                    CreatedByUserId = user.Result.Id,
                    CreatedDate = DateTime.Now,
                };
            }
            db.Posts.Add(createdEntity);
            db.SaveChanges(); 

            return Ok();
        }

        [HttpPut("posts/{id}")]
        public IActionResult PostEdit([FromRoute] int id, PostDto post)
        {
            var foundPost = db.Posts.FirstOrDefault(x => x.Id == id);

            if (foundPost == null) return NotFound();

            if (ModelState.IsValid)
            {
                foundPost.Title = post.Title;
                foundPost.FilePath = post.FilePath;
            }
            db.Posts.Update(foundPost);
            db.SaveChanges();

            return Ok();
        }

        [HttpDelete("posts/{id}")]
        public IActionResult PostDelete([FromRoute] int id)
        {
            var a = db.Posts.FirstOrDefault(x => x.Id == id);
            a.DeletedDate = DateTime.Now;
            db.SaveChanges();

            return Ok(a);
        }
    }
}
