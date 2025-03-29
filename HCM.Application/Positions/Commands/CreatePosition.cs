using HCM.Domain;
using HCM.Persistence;
using MediatR;

namespace HCM.Application.Positions.Commands;

public class CreatePosition
{
    public class Command : IRequest<Guid>
    {
        public required Position Position { get; set; }
    }

    public class Handler (AppDbContext context): IRequestHandler<Command, Guid>
    {
        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Positions.Add(request.Position);

            await context.SaveChangesAsync(cancellationToken);

            return request.Position.Id;
        }
    }
}