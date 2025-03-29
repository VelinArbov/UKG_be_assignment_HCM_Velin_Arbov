using HCM.Api.Endpoint;
using HCM.Application.Core;
using HCM.Application.Positions.Queries;
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
builder.Services.AddMediatR(x =>
    x.RegisterServicesFromAssemblyContaining<GetPositionList.Handler>());
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

var app = builder.Build();

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    DbInitializer.Initialize(context);
}

app.UseCors(x =>
    x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3001", "https://localhost:3000")
);

app.UseAuthorization();

app.MapControllers();
app.MapPositionEndpoints();

app.Run();
