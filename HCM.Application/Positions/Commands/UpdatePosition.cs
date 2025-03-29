using AutoMapper;
using HCM.Domain;
using HCM.Persistence;
using MediatR;

namespace HCM.Application.Positions.Commands;

public class UpdatePosition
{
    public class Command : IRequest
    {
        public Guid Id { get; set; }
        public required Position Position { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var position = await context.Positions.FindAsync([request.Id], cancellationToken)
                           ?? throw new Exception("Cannot find position");

            mapper.Map(request.Position, position);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}