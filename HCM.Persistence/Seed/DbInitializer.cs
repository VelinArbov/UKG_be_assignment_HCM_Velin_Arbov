using HCM.Domain;

namespace HCM.Persistence.Seed;

public static class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        // Ensure the database is created
        context.Database.EnsureCreated();

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
}