using FluentValidation;
using HCM.Api.Endpoint;
using HCM.Api.Middleware;
using HCM.Application.Core;
using HCM.Application.Positions.Queries;
using HCM.Application.Positions.Validators;
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
{
    x.RegisterServicesFromAssemblyContaining<GetPositionList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreatePositionValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    DbInitializer.Initialize(context);
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(x =>
    x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3001", "https://localhost:3000")
);

app.UseAuthorization();

app.MapControllers();
app.MapPositionEndpoints();

app.Run();
