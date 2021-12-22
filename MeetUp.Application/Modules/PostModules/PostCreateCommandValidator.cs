using FluentValidation;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostCreateCommandValidator : AbstractValidator<PostCreateCommand>
    {
        public PostCreateCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotNull()
                .NotEmpty()
                .WithMessage("Title is required");
/*
            RuleFor(x => x.FilePath)
                .NotNull()
                .NotEmpty()
                .WithMessage("FilePath is required");*/

        }
    }
}
