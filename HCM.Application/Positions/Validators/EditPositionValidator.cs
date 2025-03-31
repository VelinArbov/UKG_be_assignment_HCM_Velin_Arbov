using FluentValidation;
using HCM.Application.Positions.Commands;
using HCM.Application.Positions.DTOs;

namespace HCM.Application.Positions.Validators;

public class UpdatePositionValidator
    : BasePositionValidator<UpdatePosition.Command, UpdatePositionDto>
{
    public UpdatePositionValidator() : base(x => x.PositionDto)
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Id is required");
    }
}