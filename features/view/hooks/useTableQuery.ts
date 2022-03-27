import { AxiosError } from "axios";
import React from "react";
import { useQueryClient, useQuery } from "react-query";
import { fetchAsync } from "../../../lib/axios";
import { PagingResults } from "../../../types";

export function useTableQuery<T extends PagingResults<any>>({
  apiPathname,
}: {
  apiPathname: string;
}) {
  const { pathname, search } = window.location || {};
  const client = useQueryClient();

  const TableQuery = useQuery<T, AxiosError>(
    ["Table", { loc: pathname + (search.length === 0 ? "?page=1" : search) }],
    () =>
      fetchAsync({
        method: "GET",
        path: `${apiPathname}${search.length === 0 ? "?page=1" : search}`,
      }),
    { keepPreviousData: true, staleTime: 5000, enabled: !!location }
  );
  React.useEffect(() => {
    if (!!TableQuery?.data?.next) {
      const url = new URL(TableQuery.data.next);
      const { search } = url;
      const preFetchkey = ["Table", { loc: pathname + search }];
      client.prefetchQuery(preFetchkey, () =>
        fetchAsync({
          method: "GET",
          path: `${apiPathname}${search}`,
        })
      );
    }
  }, [TableQuery.data, pathname, search]);
  return TableQuery;
}
