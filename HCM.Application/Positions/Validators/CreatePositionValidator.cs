using FluentValidation;
using HCM.Application.Positions.Commands;

namespace HCM.Application.Positions.Validators;

public class CreatePositionValidator : AbstractValidator<CreatePosition.Command>
{
    public CreatePositionValidator()
    {
        RuleFor(x => x.PositionDto.Title).NotEmpty().WithMessage("Title is required.");
        RuleFor(x => x.PositionDto.Description).NotEmpty().WithMessage("Description is required.");
        RuleFor(x => x.PositionDto.Date).NotEmpty().WithMessage("Date is required.");
        RuleFor(x => x.PositionDto.City).NotEmpty().WithMessage("Title is required.");
    }
}