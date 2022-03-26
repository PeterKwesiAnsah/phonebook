export type PagingResults<T> = {
  count: number;
  next: string | null;
  prev: string | null;
  results: T[];
};
export {};
