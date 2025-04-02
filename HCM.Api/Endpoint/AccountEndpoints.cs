using HCM.Application.Positions.Commands;
using HCM.Application.Positions.DTOs;
using HCM.Application.Positions.Queries;
using MediatR;
using HCM.Api.Common.Extensions;
using HCM.Api.DTOs;
using Microsoft.AspNetCore.Identity;
using HCM.Domain;

namespace HCM.Api.Endpoint
{
    public static class AccountEndpoints
    {
        public static void MapAccountEndpoints(this WebApplication app)
        {
            app.MapPost("api/account/register", RegisterUser);
        }



        private static async Task<IResult> RegisterUser(RegisterDto registerDto, SignInManager<User> signInManager)
        {
            var user = new User
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName
            };

            var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
            }

            // Assign default role (e.g., "Employee")
            var roleResult = await signInManager.UserManager.AddToRoleAsync(user, "Employee");

            if (!roleResult.Succeeded)
            {
                throw new Exception(string.Join(Environment.NewLine, roleResult.Errors.Select(e => e.Description)));
            }

            return Results.Created($"/api/users/{user.Id}", new
            {
                user.Id,
                user.DisplayName,
                user.Email
            });

        }
    }
}
