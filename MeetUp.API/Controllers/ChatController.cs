﻿using AutoMapper;
using MeetUp.Application.Interfaces;
using MeetUp.Domain.Models.Entities;
using MeetUp.Domain.Models.EntityDtos;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace MeetUp.API.Controllers
{
    [AllowAnonymous]
    public class ChatController : BaseApiController
    {
        private readonly AppDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper mapper;
        private readonly IUserAccessor userAccessor;

        public ChatController(AppDbContext context, UserManager<AppUser> userManager,IMapper mapper,IUserAccessor userAccessor)
        {
            _context = context;
            _userManager = userManager;
            this.mapper = mapper;
            this.userAccessor = userAccessor;
        }
        [HttpGet]
        public IActionResult Index()
        {
            string userId = _userManager.GetUserId(User);
            List<AppUser> customUsers = _context.Users.Include(x=>x.Photos).Where(u => u.Id != userId).ToList();
            return Ok(mapper.Map<List<AppUserDto>>(customUsers));
        }
        [HttpGet("firendId/{username}")]
        public IActionResult Chat(string username)
        {
            if (username == null)
            {
                return NotFound();
            }
            var user = userAccessor.GetUsername();
            string userId = _userManager.FindByEmailAsync(userAccessor.GetUsername()).Result.Id;
            string friendId = _userManager.FindByNameAsync(username).Result.Id;

            List<Message> messages = _context.Messages.Include(u => u.Sender).Include(u => u.Receiver)
                                                      .Where(m => (m.SenderId == friendId && m.ReceiverId == userId) ||
                                                                  (m.SenderId == userId && m.ReceiverId == friendId))
                                                      .OrderBy(o => o.Date)
                                                      .ToList();

            foreach (var item in messages)
            {
                item.IsRead = true;
                _context.Update(item);
            }
            _context.SaveChanges();
            return Ok(messages);
        }
    }
}