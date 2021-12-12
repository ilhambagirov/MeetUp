using MediatR;
using MeetUp.Application.Infrastructure;
using MeetUp.Application.Interfaces;
using MeetUp.Persistence.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Linq;

namespace MeetUp.API.Extensions
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

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            var asmbls = AppDomain.CurrentDomain.GetAssemblies().Where(a => a.FullName.StartsWith("MeetUp")).ToArray();

            services.AddMediatR(asmbls);

            /*services.AddAutoMapper(typeof(MappingProfiles).Assembly);*/

            services.AddScoped<IUserAccessor, UserAccessor>();

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
