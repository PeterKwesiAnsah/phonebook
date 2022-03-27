import { Box } from "@mui/material";
import React, { ReactChild } from "react";

export const Container = ({ children }: { children: ReactChild }) => {
  return (
    <Box
      sx={{
        minHeight: "50vh",

        maxWidth: "1024px",
        margin: "0 auto",
        mt: "10%",
      }}
    >
      {children}
    </Box>
  );
};
