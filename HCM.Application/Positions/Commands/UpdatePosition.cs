using AutoMapper;
using HCM.Application.Core;
using HCM.Domain;
using HCM.Persistence;
using MediatR;

namespace HCM.Application.Positions.Commands;

public class UpdatePosition
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
        public required Position Position { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var position = await context.Positions.FindAsync([request.Id], cancellationToken);

            if (position == null) return Result<Unit>.Failure("Cannot find position", 400);

            mapper.Map(request.Position, position);

            return await context.SaveChangesAsync(cancellationToken) > 0
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to update position", 400);
        }
    }
}