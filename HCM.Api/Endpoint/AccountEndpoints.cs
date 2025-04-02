using HCM.Api.DTOs;
using Microsoft.AspNetCore.Identity;
using HCM.Domain;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace HCM.Api.Endpoint
{
    public static class AccountEndpoints
    {
        public static void MapAccountEndpoints(this WebApplication app)
        {
            app.MapPost("api/account/register", RegisterUser);
            app.MapGet("api/account/user", GetUserDetails);
            app.MapPost("api/account/logout", Logout);
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

        [AllowAnonymous]
        private static async Task<IResult> GetUserDetails(SignInManager<User> signInManager, ClaimsPrincipal claims)
        {
            if (!claims.Identity?.IsAuthenticated ?? true)
            {
                return Results.Unauthorized();
            }

            var user = await signInManager.UserManager.GetUserAsync(claims);

            return Results.Ok(new 
            {
                user.DisplayName,
                user.Email,
                user.Id,
                user.ImageUrl
            });
        }

        [Authorize]
        private static async Task<IResult> Logout(SignInManager<User> signInManager)
        {
            await signInManager.SignOutAsync();

            return Results.NoContent();
        }
    }
}
