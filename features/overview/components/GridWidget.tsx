import React from "react";
import { QueryOptions, UseQueryOptions } from "react-query";
import { Stack, Typography } from "@mui/material";
import { useQueries } from "react-query";
import { PagingResults, Subscriber } from "../../../types";
import { fetchAsync } from "../../../lib/axios";
import { Widget } from ".";
import { AxiosError } from "axios";
import { getAllSubs, getPostPaidSubs, getPrePaidSubs } from "../api";
import Link from "next/link";
///import { Link } from "next/link";
// import { getAllSubs } from "../api";
// import { getPostPaidSubs } from "../api/getPostpaidSubs";

export const GridWidget = () => {
  const Widgets: (UseQueryOptions<PagingResults<Subscriber>, AxiosError> & {
    name: string;
    to: string;
  })[] = [
    {
      queryKey: "all",
      queryFn: getAllSubs,
      name: "Total Subs",
      to: "",
    },
    {
      queryKey: "prepaid",
      queryFn: getPrePaidSubs,
      name: "Total PrePaid Subs",
      to: "?service_type=MOBILE_PREPAID",
    },
    {
      queryKey: "postpaid",
      queryFn: getPostPaidSubs,
      name: "Total PostPaid Subs",
      to: "?service_type=MOBILE_POSTPAID",
    },
  ];
  const widgetQueries = useQueries(Widgets);
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: "10%",
      }}
    >
      {Widgets.map(({ name, to }, index) => (
        <Link key={index} href={`/view/${to}`}>
          <a>
            <Widget
              name={name}
              value={widgetQueries[index].data?.count || 0}
              isSuccess={widgetQueries[index].isSuccess}
            ></Widget>
          </a>
        </Link>
      ))}

    
    </Stack>
  );
};

//export default GridWidget
