import { Box, Typography, useTheme } from "@mui/material";
import React, { ReactChild } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { borderStyles } from "../../overview/components";

const methodsDic: { [k in RootState["subscriber"]["method"]]: string } = {
  POST: "Create",
  PATCH: "Update",
  DELETE: "DELETE",
};
export const ActionLayout = ({ children }: { children: ReactChild }) => {
  const { method } = useSelector((state: RootState) => state.subscriber);
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...borderStyles,
        borderColor: "transparent",
        minWidth:
          //@ts-ignore
          theme.components?.MuiFilledInput?.styleOverrides?.root.maxWidth,
      }}
    >
      <Typography variant="h1">{methodsDic[method]}</Typography>
      {children}
    </Box>
  );
};

//export default ActionLayout;
