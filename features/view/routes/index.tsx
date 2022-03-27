import { Typography, Stack } from "@mui/material";
//import { Subscriber } from "@prisma/client";
import React from "react";
import { PagingResults, Subscriber } from "../../../types";
import { ListLayout, ServiceRow, services, TableQuery } from "../components";
import { useTableQuery } from "../hooks";
import { DataTableProvider } from "../providers/DataTableProvider";

export const rows = (subs: PagingResults<Subscriber>["results"]) => {
  return subs.map((sub) => {
    return {
      id: sub.id,
      sub_id: sub.id,
      name: sub.owner.name,
      number: sub.msisdn,
      service_type: sub.service_type,
    };
  });
};
export const columns = [
  {
    field: "sub_id",
    headerName: "Sub ID",
    flex: 0.2,
  },

  {
    field: "name",
    headerName: "Name",
    flex: 0.2,
  },
  {
    field: "number",
    headerName: "Phone",
    flex: 0.2,
  },
  {
    field: "service_type",
    headerName: "Service Type",
    flex: 0.2,
  },
];
export const Subscribers = () => {
  const SubscribersQuery = useTableQuery<PagingResults<Subscriber>>({
    apiPathname: "/subscriber/",
  });

  return (
    <ListLayout Component={() => <ServiceRow listNav={services}></ServiceRow>}>
      <>
        <DataTableProvider
          EmptyTableComponent={
            <Typography variant="h3">No Subsribers Found</Typography>
          }
          queryResult={SubscribersQuery}
          genRows={rows}
          columns={columns}
        >
          <TableQuery></TableQuery>
        </DataTableProvider>
      </>
    </ListLayout>
  );
};

//export default Orders
