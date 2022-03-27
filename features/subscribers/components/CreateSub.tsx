import React from "react";
import {
  Grid,
  Box,
  FilledInput,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { services } from ".";
import { inputStyles } from "../../../utils";
import { useCreateSub } from "../hooks";
import { useDispatch } from "react-redux";
import { close } from "../subscriberSlice";

const defaultMsidn = "+233507140670";
export const CreateSub = () => {
  const createSubMutation = useCreateSub();
  const dispatch = useDispatch();
  const createSubHander: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //@ts-ignore
    const name = e.target.name.value;
    //@ts-ignore
    const service_type = e.target.service_type.value;
    createSubMutation.mutate(
      {
        name,
        msisdn: defaultMsidn,
        service_type,
      },
      {
        onSuccess: () => {
          dispatch(close());
        },
      }
    );
    //console.log(name, service_type);
  };
  return (
    <Box component="form" onSubmit={createSubHander}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel>Name</InputLabel>
          <FilledInput
            id="name"
            name="name"
            placeholder="Enter Full Name"
            type="text"
            required
            aria-required
            sx={inputStyles()}
          ></FilledInput>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Select Service Type</InputLabel>
          <TextField
            select
            id="service_type"
            variant="filled"
            name="service_type"
            required
            defaultValue={"MOBILE_PREPAID"}
          >
            {services
              .filter((service) => service.name !== "All")
              .map((service) => (
                <MenuItem key={service.name} value={service.service_type}>
                  {service.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 1,
          ml: "auto",
          display: "block",
          opacity: createSubMutation.isLoading ? 0.7 : 1,
        }}
      >
        {createSubMutation.isLoading ? "Creating" : "Create"}
      </Button>
    </Box>
  );
};
