using FluentValidation;

namespace MeetUp.Application.Modules.CommentModules
{
    class CommentCreateCommandValidator : AbstractValidator<CommentCreateCommand>
    {
        public CommentCreateCommandValidator()
        {
            RuleFor(x => x.Body)
                .NotNull()
                .NotEmpty()
                .WithMessage("Body is required");
        }
    }
}
