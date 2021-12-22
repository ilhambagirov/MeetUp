using FluentValidation;
using MeetUp.Domain.Models.EntityDtos;

namespace MeetUp.Application.Modules.PostModules
{
    public class PostEditCommandValidator : AbstractValidator<PostDto>
    {
        public PostEditCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotNull()
                .NotEmpty()
                .WithMessage("Title is required");

            /* RuleFor(x => x.FilePath)
                 .NotNull()
                 .NotEmpty()
                 .WithMessage("FilePath is required");*/

        }
    }
}
