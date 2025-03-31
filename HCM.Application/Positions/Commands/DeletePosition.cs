using HCM.Application.Core;
using HCM.Persistence;
using MediatR;

namespace HCM.Application.Positions.Commands;

public class DeletePosition
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var position = await context.Positions.FindAsync([request.Id], cancellationToken);

            if (position == null) return Result<Unit>.Failure("Activity not found", 404);

            context.Positions.Remove(position);

            return await context.SaveChangesAsync(cancellationToken) > 0
             ? Result<Unit>.Success(Unit.Value) 
             : Result<Unit>.Failure("Failed to delete position", 400);
        }
    }
}