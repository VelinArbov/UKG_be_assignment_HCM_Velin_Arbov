using HCM.Persistence;
using MediatR;

namespace HCM.Application.Positions.Commands;

public class DeletePosition
{
    public class Command : IRequest
    {
        public Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var position = await context.Positions.FindAsync([request.Id], cancellationToken)
                           ?? throw new Exception("Cannot find position");

            context.Positions.Remove(position);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}