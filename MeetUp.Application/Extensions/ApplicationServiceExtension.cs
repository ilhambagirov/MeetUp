using MediatR;
using MeetUp.Application.Infrastructure;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Services;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

            /*services.AddAutoMapper(typeof(MappingProfiles).Assembly);*/

            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddHttpContextAccessor();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();


            services.AddCors(cfg =>
            {
                cfg.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            return services;
        }
    }
}
