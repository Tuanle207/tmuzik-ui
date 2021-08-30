import { useState } from 'react'

interface IReduxPaginationFetchInput {

}

export const useReduxPaginationFetch = (input: IReduxPaginationFetchInput) => {

  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState<number | undefined>();




}