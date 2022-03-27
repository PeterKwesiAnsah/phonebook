import { CircularProgress, Stack } from "@mui/material";
import { useDataTable } from "../hooks";
import { DataTable } from "./DataTable";

export const TableQuery = () => {
  const { queryResult, EmptyTableComponent } = useDataTable();

  if (queryResult!.isSuccess && queryResult!.data!.results.length === 0) {
    return <>{EmptyTableComponent}</>;
  }
  if (queryResult!.isSuccess) {
    return <DataTable></DataTable>;
  }
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ mt: "10%", mb: "10%" }}
    >
      <CircularProgress></CircularProgress>
    </Stack>
  );
};
