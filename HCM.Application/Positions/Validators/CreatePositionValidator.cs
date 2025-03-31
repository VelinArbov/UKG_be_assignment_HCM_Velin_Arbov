using FluentValidation;
using HCM.Application.Positions.Commands;
using HCM.Application.Positions.DTOs;

namespace HCM.Application.Positions.Validators;

public class CreatePositionValidator()
    : BasePositionValidator<CreatePosition.Command, CreatePositionDto>(x => x.PositionDto);