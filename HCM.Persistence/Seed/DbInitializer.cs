using HCM.Domain;
using Microsoft.AspNetCore.Identity;

namespace HCM.Persistence.Seed;

public static class DbInitializer
{
    public static async Task Initialize(AppDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        // Ensure the database is created
        context.Database.EnsureCreated();

        // Check if there are any roles already in the database
        if (!roleManager.Roles.Any())
        {
            await SeedRoleAsync(roleManager);
        }

        // Check if there are any users already in the database
        if (!userManager.Users.Any())
        {
            await SeedUsersAsync(userManager); 
        }

        // Check if there are any positions already in the database
        if (context.Positions.Any())
        {
            return;   // DB has been seeded
        }

        var positions = new Position[]
        {
            new Position
            {
                Id = Guid.NewGuid(),
                Title = "Software Developer",
                Date = new DateTime(2025, 3, 29),
                Description = "Develop and maintain software applications.",
                Category = "IT",
                IsCancelled = false,
                City = "Sofia"
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Title = "Project Manager",
                Date = new DateTime(2025, 4, 15),
                Description = "Oversee project planning and execution.",
                Category = "Management",
                IsCancelled = false,
                City = "Plovdiv"
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Title = "Data Analyst",
                Date = new DateTime(2025, 5, 10),
                Description = "Analyze and interpret complex data sets.",
                Category = "Data Science",
                IsCancelled = false,
                City = "Varna"
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Title = "HR Specialist",
                Date = new DateTime(2025, 6, 5),
                Description = "Manage recruitment and employee relations.",
                Category = "Human Resources",
                IsCancelled = false,
                City = "Burgas"
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Title = "Marketing Coordinator",
                Date = new DateTime(2025, 7, 20),
                Description = "Coordinate marketing campaigns and strategies.",
                Category = "Marketing",
                IsCancelled = false,
                City = "Ruse"
            }
        };

        foreach (var position in positions)
        {
            context.Positions.Add(position);
        }
        context.SaveChanges();
    }

    private static async Task SeedRoleAsync(RoleManager<Role> roleManager)
    {
        var roles = new[]
        {
        new Role { Name = "Admin", Description = "System Administrator" },
        new Role { Name = "HR", Description = "Human Resources" },
        new Role { Name = "Employee", Description = "General Employee" }
    };

        foreach (var role in roles)
        {
            var exists = await roleManager.RoleExistsAsync(role.Name!);
            if (!exists)
            {
                var result = await roleManager.CreateAsync(role);
                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
                }
            }
        }
    }

    private static async Task SeedUsersAsync(UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<User>
        {
            new User { DisplayName = "Bob", UserName = "employee@test.com", Email = "employee@test.com" },
            new User { DisplayName = "John", UserName = "hr@test.com", Email = "hr@test.com" },
            new User { DisplayName = "Tom", UserName = "admin@test.com", Email = "admin@test.com" },
        };

            foreach (var user in users)
            {
                var result = await userManager.CreateAsync(user, "Pa$$w0rd");
                if (!result.Succeeded)
                {
                    throw new Exception($"Failed to create user {user.Email}: " +
                        string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}