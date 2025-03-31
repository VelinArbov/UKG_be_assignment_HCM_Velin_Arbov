using FluentValidation;
using HCM.Application.Positions.DTOs;

namespace HCM.Application.Positions.Validators
{
    public class BasePositionValidator<T, TDto> : AbstractValidator<T> where TDto : BasePositionDto
    {
        public BasePositionValidator(Func<T, TDto> selector)
        {
            RuleFor(x => selector(x).Title).NotEmpty()
                .WithMessage("Title is required.")
                .MaximumLength(100).WithMessage("Title mus not exceed 100 characters");

            RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is required.");
            RuleFor(x => selector(x).Date).NotEmpty().WithMessage("Date is required.");
            RuleFor(x => selector(x).City).NotEmpty().WithMessage("City is required.");
        }
    }
}
