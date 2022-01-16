using MeetUp.Application.Services;
using MeetUp.Domain.Models.Entities;
using MeetUp.Persistence.DataContext;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks;
using static MeetUp.Application.Helpers.Providers.EmailConfirmationProvider;

namespace MeetUp.Application.Extensions
{
    public static class IdentityServiceExtension
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration cfg)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.SignIn.RequireConfirmedEmail = true;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Tokens.EmailConfirmationTokenProvider = "emailconfirmation";
            })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddSignInManager<SignInManager<AppUser>>()
                .AddUserManager<UserManager<AppUser>>()
                .AddDefaultTokenProviders()
                .AddTokenProvider<EmailConfirmationTokenProvider<AppUser>>("emailconfirmation");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(cfg["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                }
                );

            services.AddScoped<TokenService>();

            return services;
        }
    }
}
