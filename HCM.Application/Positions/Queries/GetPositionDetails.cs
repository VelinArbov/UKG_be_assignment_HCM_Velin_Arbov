using HCM.Domain;
using HCM.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCM.Application.Positions.Queries
{
    public class GetPositionDetails
    {
        public class Query : IRequest<Position>
        {
            public required Guid Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Position>
        {
            public async Task<Position> Handle(Query request, CancellationToken cancellationToken)
            {
                var position = await context.Positions.FindAsync([request.Id], cancellationToken);

                if (position == null) throw new Exception("Activity not found");

                return position;
            }
        }
    }
}
