using Microsoft.AspNetCore.Identity;

namespace HCM.Domain;

public class Role : IdentityRole<Guid>
{
    public string? Description { get; set; }
}
