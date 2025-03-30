using System.ComponentModel.DataAnnotations;

namespace HCM.Application.Positions.DTOs;

public class CreatePositionDto
{
    [Required] public string Title { get; set; } = string.Empty;
    [Required] public DateTime Date { get; set; }
    [Required] public string Description { get; set; } = string.Empty;
    [Required] public string Category { get; set; } = string.Empty;
    [Required] public string City { get; set; } = string.Empty;
}