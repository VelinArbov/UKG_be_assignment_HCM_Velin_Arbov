using AutoMapper;
using HCM.Application.Positions.DTOs;
using HCM.Domain;

namespace HCM.Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Position, Position>();
        CreateMap<CreatePositionDto, Position>();
    }
}