import type { NextPage } from "next";
import { GridWidget } from "../features/overview/components";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <>
      <GridWidget></GridWidget>
      <Typography
        variant="subtitle1"
        color="tertiary.main"
        sx={{
          mt: 1,
          textAlign: "center",
        }}
      >
        (Click a Tab to View)
      </Typography>
    </>
  );
};

export default Home;
