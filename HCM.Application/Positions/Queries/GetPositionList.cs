using HCM.Domain;
using HCM.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCM.Application.Positions.Queries
{
    public class GetPositionList
    {
        public class Query : IRequest<List<Position>>{}

        public class Handler(AppDbContext context) : IRequestHandler<Query, List<Position>>
        {
            public async Task<List<Position>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Positions.ToListAsync(cancellationToken: cancellationToken);
            }
        }
    }
}
