using MediatR;
using MeetUp.Application.Infrastructure;
using MeetUp.Application.Infrastructure.Photos;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Services;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace MeetUp.Application.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
       IConfiguration config)
        {
            services.AddDbContext<AppDbContext>(cfg =>
            {
                cfg.UseSqlServer(config.GetConnectionString("cString"));
            });

            var asmbls = AppDomain.CurrentDomain.GetAssemblies().Where(a => a.FullName.StartsWith("MeetUp")).ToArray();

            services.AddMediatR(asmbls);

            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddHttpContextAccessor();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddSignalR();

            services.AddCors(cfg =>
            {
                cfg.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:3000"); 
                });
            });
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            return services;
        }
    }
}
