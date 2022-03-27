import { Box, Stack, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ReactChild } from "react";
import { Search } from ".";
import { borderStyles } from "../../overview/components";

export const ListLayout = ({
  children,
  Component,
}: {
  children: ReactChild;
  Component: (props: any) => JSX.Element;
}) => {
  return (
    <Box>
      <Box
        sx={{
          ...borderStyles,
          minHeight: "50vh",
          p: 0,
          mt: 2,
        }}
      >
        <Stack direction="column" sx={{ p: borderStyles.padding, pb: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "right",
              gap: "14px",

              //p: borderStyles.padding
            }}
          >
            <Component></Component>
            <Search></Search>
          </Box>
        </Stack>

        {children}
      </Box>
    </Box>
  );
};

ListLayout.defaultProps = {
  Component: () => <></>,
};
