using HCM.Application.Core;
using HCM.Domain;
using HCM.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCM.Application.Positions.Queries;

public class GetPositionList
{
    public class Query : IRequest<Result<List<Position>>>{}

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Position>>>
    {
        public async Task<Result<List<Position>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var result = await context.Positions.ToListAsync(cancellationToken: cancellationToken);

            return Result<List<Position>>.Success(result);
        }
    }
}