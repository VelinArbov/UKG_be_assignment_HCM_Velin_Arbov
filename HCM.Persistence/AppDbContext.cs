using HCM.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HCM.Persistence
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext<User, Role, Guid>(options)
    {
        public required DbSet<Position> Positions { get; set; }
    }
}
