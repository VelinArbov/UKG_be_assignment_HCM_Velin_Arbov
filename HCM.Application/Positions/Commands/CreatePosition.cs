using AutoMapper;
using HCM.Application.Positions.DTOs;
using HCM.Domain;
using HCM.Persistence;
using MediatR;

namespace HCM.Application.Positions.Commands;

public class CreatePosition
{
    public class Command : IRequest<Guid>
    {
        public required CreatePositionDto Position { get; set; }
    }

    public class Handler (AppDbContext context, IMapper mapper): IRequestHandler<Command, Guid>
    {
        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            var position = mapper.Map<Position>(request.Position);

            context.Positions.Add(position);

            await context.SaveChangesAsync(cancellationToken);

            return position.Id;
        }
    }
}