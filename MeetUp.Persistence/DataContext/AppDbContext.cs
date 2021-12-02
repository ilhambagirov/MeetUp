using Microsoft.EntityFrameworkCore;

namespace MeetUp.Persistence.DataContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
    }
}
