using AutoMapper;
using HCM.Application.Core;
using HCM.Application.Positions.DTOs;
using HCM.Domain;
using HCM.Persistence;
using MediatR;

namespace HCM.Application.Positions.Commands;

public class CreatePosition
{
    public class Command : IRequest<Result<Guid>>
    {
        public required CreatePositionDto PositionDto { get; set; }
    }

    public class Handler (AppDbContext context, IMapper mapper): IRequestHandler<Command, Result<Guid>>
    {
        public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
        {
            var position = mapper.Map<Position>(request.PositionDto);

            context.Positions.Add(position);

            return await context.SaveChangesAsync(cancellationToken) > 0
                ? Result<Guid>.Success(position.Id)
                : Result<Guid>.Failure("Failed to delete position", 400);
        }
    }
}