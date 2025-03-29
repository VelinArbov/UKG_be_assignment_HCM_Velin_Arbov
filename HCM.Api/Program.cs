using HCM.Api.Endpoint;
using HCM.Persistence;
using HCM.Persistence.Seed;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    DbInitializer.Initialize(context);
}

app.UseCors(x =>
    x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3001", "http://localhost:3000")
);

app.UseAuthorization();

app.MapControllers();
app.MapPositionEndpoints();

app.Run();
