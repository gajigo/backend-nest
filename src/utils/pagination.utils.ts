import { PaginationQuery } from 'src/types/common/pagination'
import { FindOptionsWhere, Repository } from 'typeorm'

export async function paginatedSearch<T>(
  repository: Repository<T>,
  query: PaginationQuery,
  where: FindOptionsWhere<T>
) {
  const { page, perPage } = query

  const [result, total] = await repository.findAndCount({
    where,
    withDeleted: false,
    take: +perPage,
    skip: page * perPage
  })

  return {
    data: result,
    page: {
      perPage: +perPage,
      totalItems: total,
      totalPages: Math.ceil(total / perPage),
      current: +page
    }
  }
}
