import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

export const services: {
  name: string;
  service_type: "" | "MOBILE_PREPAID" | "MOBILE_POSTPAID";
}[] = [
  {
    name: "All",
    service_type: "",
  },
  {
    name: "PrePaid",
    service_type: "MOBILE_PREPAID",
  },
  {
    name: "PostPaid",
    service_type: "MOBILE_POSTPAID",
  },
];
const activeServiceStyles = {
  color: "primary.main",
  borderColor: "primary.main",
};
const ServiceStyles = {
  color: "secondary.main",
  cursor: "pointer",
  borderBottom: "4px solid",
  borderColor: "transparent",
  "&:hover": activeServiceStyles,
};
type listNavType = { [k: string]: string }[];

export const ServiceRow = ({ listNav }: { listNav: listNavType }) => {
  const router = useRouter();
  const param = Object.keys(listNav[0])[1];
  const service = router.query[param] || "";

  const setService = React.useCallback(
    (serviceValue: string) => {
      const query = router.query;
      query[param] = serviceValue;
      delete query["page"];
      if (serviceValue === "") {
        delete query[param];
      }
      router.push({
        pathname: "/view",
        query,
      });
    },
    [router]
  );

  return (
    <Box component="ul" sx={{ display: "flex", m: 0, p: 0, gap: 2, flex: 1 }}>
      {services.map(({ name, service_type: value }, index) => (
        <Box
          component="li"
          key={index}
          onClick={() => setService(value)}
          sx={
            service === value
              ? { ...ServiceStyles, ...activeServiceStyles }
              : ServiceStyles
          }
        >
          <Typography
            color="inherit"
            sx={{ fontWeight: 700 }}
            variant="subtitle1"
          >
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
