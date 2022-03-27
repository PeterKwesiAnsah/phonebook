import React from "react";
//import { Subscribers } from "../features/view/routes/index";
import loadable from "@loadable/component";
import { Stack, CircularProgress } from "@mui/material";
const Subscribers = loadable(
  async () => {
    const { Subscribers } = await import("../features/view/routes");
    return Subscribers;
  },
  {
    fallback: (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress></CircularProgress>
      </Stack>
    ),
    ssr: false,
  }
);
const View = () => {
  return <Subscribers></Subscribers>;
};

export default View;
