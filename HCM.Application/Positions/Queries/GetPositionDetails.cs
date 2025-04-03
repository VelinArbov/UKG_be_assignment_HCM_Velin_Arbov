using HCM.Application.Core;
using HCM.Domain;
using HCM.Persistence;
using MediatR;

namespace HCM.Application.Positions.Queries;

public class GetPositionDetails
{
    public class Query : IRequest<Result<Position>>
    {
        public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Position>>
    {
        public async Task<Result<Position>> Handle(Query request, CancellationToken cancellationToken)
        {
            var position = await context.Positions.FindAsync([request.Id], cancellationToken);

            return position == null 
                ? Result<Position>.Failure("Position not found",404) 
                : Result<Position>.Success(position);
        }
    }
}