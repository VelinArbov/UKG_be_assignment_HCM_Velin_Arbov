using HCM.Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;

namespace HCM.Api.Common.Extensions
{
    public static class ResultExtensions
    {
        public static IResult ToApiResult<T>(this Result<T> result)
        {
            if (result.IsSuccess)
                return Results.Ok(result.Value);

            return MapError(result.Error, result.StatusCode);
        }

        public static IResult ToApiResult(this Result<Unit> result)
        {
            if (result.IsSuccess)
                return Results.NoContent();

            return result.ToApiResult<Unit>();
        }

        private static IResult MapError(string? error, int statusCode)
        {
            return statusCode switch
            {
                400 => Results.BadRequest(error),
                401 => Results.Unauthorized(),
                403 => Results.Forbid(),
                404 => Results.NotFound(error),
                409 => Results.Conflict(error),
                500 => Results.Problem(error, statusCode: 500),
                _ => Results.Problem(error, statusCode: statusCode)
            };
        }
    }
}
