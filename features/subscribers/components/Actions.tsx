import React from "react";
import { Box, Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { close } from "../subscriberSlice";
import { borderStyles } from "../../overview/components";
import { CreateSub } from ".";
import { ActionLayout } from "../Layout";

export const Actions = () => {
  const state = useSelector((state: RootState) => state.subscriber);
  const dispatch = useDispatch();
  return (
    <Dialog
      open={state.open}
      onClose={() => {
        dispatch(close());
      }}
    >
      <ActionLayout>
        <CreateSub></CreateSub>
      </ActionLayout>
    </Dialog>
  );
};

//export default Actions
