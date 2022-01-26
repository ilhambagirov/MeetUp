using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;

namespace MeetUp.Application.Helpers.Providers
{
    public class PasswordResetProvider
    {
        public class PasswordResetTokenProvider<TUser> : DataProtectorTokenProvider<TUser> where TUser : class
        {
            public PasswordResetTokenProvider(IDataProtectionProvider dataProtectionProvider,
                IOptions<PasswordResetTokenProviderOptions> options,
                ILogger<DataProtectorTokenProvider<TUser>> logger)
                : base(dataProtectionProvider, options, logger)
            {
            }
        }

        public class PasswordResetTokenProviderOptions : DataProtectionTokenProviderOptions
        {
            public PasswordResetTokenProviderOptions()
            {
                Name = "PasswordReset";
                TokenLifespan = TimeSpan.FromDays(1);
            }
        }
    }
}
