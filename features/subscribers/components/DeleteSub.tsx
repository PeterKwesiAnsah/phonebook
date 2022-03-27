import { Stack, Typography, Button, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDelSub } from "../hooks";
import { close } from "../subscriberSlice";

export const DeleteSub = () => {
  const dispatch = useDispatch();
  const subId = useSelector((state: RootState) => state.subscriber.data?.id)!;

  const delMutation = useDelSub();
  const deleSubCallback = () => {
    !delMutation.isLoading &&
      delMutation.mutate(subId, {
        onSuccess: () => {
          dispatch(close());
        },
      });
  };
  return (
    <Stack
      spacing={2}
      sx={{
        mt: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",

          // lineHeight: "initial",
        }}
      >
        Are you sure you want to{" "}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          remove
        </Typography>{" "}
        this Subscriber?
      </Typography>

      <Button
        variant="contained"
        onClick={deleSubCallback}
        sx={{
          width: "50%",
          margin: "auto !important",
          display: "block",
          bgcolor: "error.main",
          mt: 4,
          cursor: delMutation.isLoading ? "not-allowed" : "pointer",

          opacity: delMutation.isLoading ? 0.7 : 1,
          "&:hover": {
            bgcolor: "error.main",
          },
        }}
      >
        {delMutation.isLoading ? "Removing" : "Remove"}
      </Button>
    </Stack>
  );
};

//export default DeletSub
