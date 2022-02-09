using MediatR;
using MeetUp.Application.Infrastructure;
using MeetUp.Application.Infrastructure.Photos;
using MeetUp.Application.Interfaces;
using MeetUp.Application.Services;
using MeetUp.Persistence.DataContext;
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
            services.AddDbContext<AppDbContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either Heroku-provided
                // connection string, or development connection string from env var.
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("cString");
                }
                else
                {
                    // Use connection string provided at runtime by Heroku.
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];

                    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
                }

                // Whether the connection string came from the local development configuration file
                // or from the environment variable from Heroku, use it to set up your DbContext.
                options.UseNpgsql(connStr);
            });


            var asmbls = AppDomain.CurrentDomain.GetAssemblies().Where(a => a.FullName.StartsWith("MeetUp")).ToArray();

           

            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddHttpContextAccessor();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddSignalR();

            services.AddMediatR(asmbls);

            services.AddAutoMapper(typeof(MappingProfiles));

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
