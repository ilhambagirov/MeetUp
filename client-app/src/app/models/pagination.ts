export interface Pagination {
    currentPage: number
    itemsPerPage: number
    totalPages: number
    totalCount: number
}

export class PaginatedResult<T> {
    data: T
    pagination: Pagination
    constructor(data: T, pagination: Pagination) {
        this.data = data
        this.pagination = pagination
    }
}

export class PagingParams {
    pageIndex;
    pageSize;

    constructor(pageIndex = 1, pageSize = 5) {
        this.pageIndex = pageIndex
        this.pageSize = pageSize
    }
}