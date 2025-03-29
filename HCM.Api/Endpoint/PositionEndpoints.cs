using HCM.Domain;
using HCM.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HCM.Api.Endpoint
{
    public static class PositionEndpoints
    {
        public static void MapPositionEndpoints(this WebApplication app)
        {
            app.MapGet("/api/positions", GetAllPositions);
            app.MapGet("/api/positions/{id}", GetPositionById);
            app.MapPost("/api/positions", CreatePosition);
            app.MapPut("/api/positions/{id}", UpdatePosition);
            app.MapDelete("/api/positions/{id}", DeletePosition);
        }

        private static async Task<IResult> GetAllPositions(AppDbContext db)
        {
            var positions = await db.Positions.ToListAsync();
            return Results.Ok(positions);
        }

        private static async Task<IResult> GetPositionById(Guid id, AppDbContext db)
        {
            var position = await db.Positions.FindAsync(id);
            return position is not null ? Results.Ok(position) : Results.NotFound();
        }

        private static async Task<IResult> CreatePosition(Position position, AppDbContext db)
        {
            db.Positions.Add(position);
            await db.SaveChangesAsync();
            return Results.Created($"/positions/{position.Id}", position);
        }

        private static async Task<IResult> UpdatePosition(Guid id, Position updatedPosition, AppDbContext db)
        {
            var position = await db.Positions.FindAsync(id);
            if (position is null) return Results.NotFound();

            position.Title = updatedPosition.Title;
            position.Date = updatedPosition.Date;
            position.Description = updatedPosition.Description;
            position.Category = updatedPosition.Category;
            position.IsCancelled = updatedPosition.IsCancelled;
            position.City = updatedPosition.City;

            await db.SaveChangesAsync();
            return Results.NoContent();
        }

        private static async Task<IResult> DeletePosition(Guid id, AppDbContext db)
        {
            var position = await db.Positions.FindAsync(id);
            if (position is null) return Results.NotFound();

            db.Positions.Remove(position);
            await db.SaveChangesAsync();
            return Results.NoContent();
        }
    }
}
