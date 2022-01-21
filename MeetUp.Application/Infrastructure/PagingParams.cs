namespace MeetUp.Application.Infrastructure
{
    public class PagingParams
    {
        private const int MaxPagesize = 50;
        public int PageIndex { get; set; } = 1;
        private int pageSize = 2;

        public int PageSize
        {
            get => pageSize;
            set => pageSize = (value > MaxPagesize) ? MaxPagesize : value;
        }

    }
}
