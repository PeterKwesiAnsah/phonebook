import { AxiosError } from "axios";
import React, { ReactChild } from "react";
import { UseQueryResult } from "react-query";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { PagingResults } from "../../../types";

type DataTableProviderProps = {
  children: ReactChild;
  queryResult: UseQueryResult<PagingResults, AxiosError>;
  columns: GridColDef[];
  genRows: (data: PagingResults["results"]) => GridRowsProp;
  page?: string;
  page_size?: string;
  EmptyTableComponent: JSX.Element;
  hidePagination?: boolean;
};
export const DataTableContext = React.createContext<
  Omit<DataTableProviderProps, "children">
>({
  columns: [],
  EmptyTableComponent: <></>,
  genRows: () => [] as GridRowsProp,
  queryResult: {} as UseQueryResult<PagingResults, AxiosError>,
});

export const DataTableProvider = ({
  children,
  ...rest
}: DataTableProviderProps) => {
  return (
    <DataTableContext.Provider value={rest}>
      {children}
    </DataTableContext.Provider>
  );
};

DataTableProvider.defaultProps = {
  page: "1",
  page_size: "20",
  hidePagination: false,
};
