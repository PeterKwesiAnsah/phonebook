import { Typography, Stack, IconButton } from "@mui/material";
//import { Subscriber } from "@prisma/client";
import React from "react";
import { PagingResults, Subscriber } from "../../../types";
import {
  Actions,
  ListLayout,
  ServiceRow,
  services,
  TableQuery,
} from "../components";
import { useTableQuery } from "../hooks";
import { DataTableProvider } from "../providers/DataTableProvider";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { update, deleteSub } from "../subscriberSlice";
export const Subscribers = () => {
  const dispatch = useDispatch();
  const rows = (subs: PagingResults<Subscriber>["results"]) => {
    return subs.map((sub) => {
      return {
        id: sub.id,
        sub_id: sub.id,
        name: sub.owner.name,
        number: sub.msisdn,
        service_type: sub.service_type,
        action: sub.id,
      };
    });
  };
  const columns = [
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
      renderCell: (params: { value: string }) => {
        return (
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "secondary.main",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "service_type",
      headerName: "Service Type",
      flex: 0.2,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.1,
      renderCell: (params: { value: number }) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton
            onClick={() => {
              dispatch(
                update({
                  id: params.value,
                })
              );
            }}
          >
            <ModeEditIcon></ModeEditIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(
                deleteSub({
                  id: params.value,
                })
              );
            }}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Stack>
      ),
    },
  ];
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
        <Actions></Actions>
      </>
    </ListLayout>
  );
};

//export default Orders
