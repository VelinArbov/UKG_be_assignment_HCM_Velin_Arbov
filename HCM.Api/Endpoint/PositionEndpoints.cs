using HCM.Application.Positions.Commands;
using HCM.Application.Positions.DTOs;
using HCM.Application.Positions.Queries;
using MediatR;
using HCM.Api.Common.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace HCM.Api.Endpoint
{
    public static class PositionEndpoints 
    {
        public static void MapPositionEndpoints(this WebApplication app)
        {
            app.MapGet("/api/positions", GetAllPositions);

            var group = app.MapGroup("/api/positions")
                  .RequireAuthorization();

            group.MapGet("/{id}", GetPositionById);
            group.MapPost("/", CreatePosition);
            group.MapPut("/{id}", UpdatePosition);
            group.MapDelete("/{id}", DeletePosition);
        }

        private static async Task<IResult> GetAllPositions(IMediator mediator)
        {
            var positions = await mediator.Send(new GetPositionList.Query());
            return Results.Ok(positions);
        }

        private static async Task<IResult> GetPositionById(Guid id, IMediator mediator)
        {
            var result = await mediator.Send(new GetPositionDetails.Query { Id = id });
            return result.ToApiResult();
        }

        private static async Task<IResult> CreatePosition(CreatePositionDto position, IMediator mediator)
        {
            var result = await mediator.Send(new CreatePosition.Command { PositionDto = position });
            return result.ToApiResult();
        }

        private static async Task<IResult> UpdatePosition(Guid id, UpdatePositionDto updatedPosition, IMediator mediator)
        {
            var result = await mediator.Send(new UpdatePosition.Command { Id = id, PositionDto = updatedPosition });
            return result.ToApiResult();
        }

        private static async Task<IResult> DeletePosition(Guid id, IMediator mediator)
        {
            var result = await mediator.Send(new DeletePosition.Command { Id = id });
            return result.ToApiResult();
        }
    }
}
