using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MeetUp.Application.Extensions
{
    static public partial class Extension
    {
        static public ModelStateDictionary IsModelState(this IActionContextAccessor ctx)
        {
            return ctx.ActionContext.ModelState;
        }
    }
}
