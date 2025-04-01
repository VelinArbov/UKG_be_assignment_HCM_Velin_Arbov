﻿using Microsoft.AspNetCore.Identity;

namespace HCM.Domain
{
    public class User : IdentityUser<Guid>
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? ImageUrl { get; set; }
    }
}
