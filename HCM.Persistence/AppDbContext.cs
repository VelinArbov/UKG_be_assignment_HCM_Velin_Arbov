using HCM.Domain;
using Microsoft.EntityFrameworkCore;

namespace HCM.Persistence
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public required DbSet<Position> Positions { get; set; }
    }
}
