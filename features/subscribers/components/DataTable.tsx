import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { CustomPagination } from ".";
import { useRouter } from "next/router";
import { useDataTable } from "../hooks";

export type DataTableprops = {};
export const DataTable = () => {
  const {
    queryResult,
    page: defaultPage,
    page_size: defaultPage_Size,
    columns,
    genRows,
    hidePagination,
  } = useDataTable();
  // const { search, pathname } = location;
  const router = useRouter();
  const query = router.query;
  const page = query["page"] ?? defaultPage;
  const page_size = query["page_size"] ?? defaultPage_Size;
  // console.log(page, page_size);
  const rows = genRows(queryResult.data!.results);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%", mt: 2.625 }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            components={{
              Pagination: hidePagination ? () => <></> : CustomPagination,
            }}
            page={Number(page) - 1}
            onPageChange={(pageNumber: number) => {
              // console.log(pageNumber);
              //query["page"] = ;
              const pageCount = "" + Number(pageNumber + 1);
              console.log(pageCount);
              router.push({
                pathname: "/view",
                query: {
                  ...query,
                  page: pageCount,
                },
              });
  
            }}
            pageSize={Number(page_size)}
            autoHeight
            paginationMode="server"
            rowCount={queryResult.data?.count}
          />
        </Box>
      </Box>
    </Box>
  );
};

//export default Top
