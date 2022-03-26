import { Box } from "@mui/material";
import React, { ReactChild } from "react";

export const Container = ({ children }: { children: ReactChild }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};


