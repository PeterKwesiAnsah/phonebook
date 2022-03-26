import { AxiosError } from "axios";
import { UseQueryOptions, UseMutationOptions } from "react-query";

export type PagingResults<T> = {
  count: number;
  next: string | null;
  prev: string | null;
  results: T[];
};

export type QueryConfig<FetcherFnType extends (...args: any) => any> =
  UseQueryOptions<Awaited<ReturnType<FetcherFnType>>>;
export type MutationConfig<FetcherFnType extends (...args: any) => any> =
  UseMutationOptions<
    Awaited<ReturnType<FetcherFnType>>,
    AxiosError,
    Parameters<FetcherFnType>[0]
  >;

export type Owner = {
  id: number;
  name: string;
};
export type Subscriber = {
  id: number;
  msisdn: string;
  service_type: string;
  service_start_date: string;
  owner: Owner;
  customer_id_owner: number;
};
