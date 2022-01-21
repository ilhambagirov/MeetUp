using AutoMapper;
using MeetUp.Application.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace MeetUp.Application.Extensions
{
    public static partial class Extension
    {
        public static Task<PagedList<T, Y>> PaginatedMappedListAsync<T, Y>(this IQueryable<Y> queryable, IMapper mapper, int pageNumber, int pageSize)
         => PagedList<T, Y>.CreateAsync(queryable, mapper, pageNumber, pageSize);
    }
}
