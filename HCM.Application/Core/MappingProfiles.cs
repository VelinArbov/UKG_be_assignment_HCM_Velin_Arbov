using AutoMapper;
using HCM.Domain;

namespace HCM.Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Position, Position>();
    }
}