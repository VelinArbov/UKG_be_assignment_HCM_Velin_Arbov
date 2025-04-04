﻿namespace HCM.Application.Positions.DTOs;

public class BasePositionDto
{
    public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
}