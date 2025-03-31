using FluentValidation;

namespace HCM.Api.Middleware
{
    public class ExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (ValidationException ex)
            {
                await HandleValidationException(context, ex);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        private static async Task HandleValidationException(HttpContext context, ValidationException validationException)
        {
            var validationErrors = new Dictionary<string, string[]>();

            if (validationException.Errors is not null)
            {
                foreach (var error in validationException.Errors)
                {
                    if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                    {
                        validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                    }
                    else
                    {
                        validationErrors[error.PropertyName] = [error.ErrorMessage];
                    }
                }
            }

            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            var validationProblem = new HttpValidationProblemDetails(validationErrors)
            {
                Status = StatusCodes.Status400BadRequest,
                Type = "ValidationFailure",
                Title = "Validation error",
                Detail = "One or more validation errors has occurred"
            };

            await context.Response.WriteAsJsonAsync(validationProblem);
        }
    }
}
