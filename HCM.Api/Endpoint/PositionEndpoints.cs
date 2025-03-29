using HCM.Domain;
using HCM.Persistence;
using HCM.Application;
using HCM.Application.Positions.Commands;
using HCM.Application.Positions.Queries;
using MediatR;

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

        private static async Task<IResult> GetAllPositions(IMediator mediator)
        {
            var positions = await mediator.Send(new GetPositionList.Query());
            return Results.Ok(positions);
        }

        private static async Task<IResult> GetPositionById(Guid id, IMediator mediator)
        {
            var position = await mediator.Send(new GetPositionDetails.Query { Id = id });
            return Results.Ok(position);
        }

        private static async Task<IResult> CreatePosition(Position position, IMediator mediator)
        {
            var result = await mediator.Send(new CreatePosition.Command{Position = position});
            return Results.Created($"/positions/{result}", position);
        }

        private static async Task<IResult> UpdatePosition(Guid id, Position updatedPosition, IMediator mediator)
        {
           await mediator.Send(new UpdatePosition.Command { Id = id, Position = updatedPosition });
            return Results.NoContent();
        }

        private static async Task<IResult> DeletePosition(Guid id, IMediator mediator)
        {
            await mediator.Send(new DeletePosition.Command { Id = id });
            return Results.NoContent();
        }
    }
}
