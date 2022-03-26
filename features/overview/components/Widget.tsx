import { Box, Typography, Stack, Skeleton } from "@mui/material";
import React from "react";

type WidgetProps = { isSuccess: boolean; value: string | number; name: string };

export const borderStyles = {
  padding: "14px 20px",
  bgcolor: "background.paper",
  borderRadius: "3.87588px",
  border: 1,
  borderColor: "rgba(0, 0, 0, 0.05)",
};
export const Widget = ({ isSuccess, value, name }: WidgetProps) => {
  return (
    <Box
      sx={{
        height: 85,
        width: "100%",
        ...borderStyles,
        maxWidth: 211,
        transition: "all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s",
        "&:hover": {
          transform: "translateY(-10px)",
        },
      }}
    >
      <Stack direction="column" spacing={0.75}>
        <Typography variant="subtitle1" color="tertiary.main">
          {name}
        </Typography>
        {isSuccess ? (
          <Typography variant="h1" sx={{ fontSize: "1.75rem" }}>
            {value}
          </Typography>
        ) : (
          <Skeleton></Skeleton>
        )}

        {/* */}
      </Stack>
    </Box>
  );
};

//export default Widget
