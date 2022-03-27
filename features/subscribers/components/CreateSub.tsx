import React from "react";
import {
  Grid,
  Box,
  FilledInput,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { services } from ".";
import { inputStyles } from "../../../utils";
import { useCreateSub, useGetSub } from "../hooks";
import { close } from "../subscriberSlice";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { parsePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";

import { RootState } from "../../../store";
//import { useTheme } from "@emotion/react";

// const defaultMsidn = "+233507140665";
export const CreateSub = () => {
  const theme = useTheme();
  const createSubMutation = useCreateSub();
  const sub = useGetSub();
  const [value, setValue] = React.useState<E164Number | undefined>(sub.msisdn);
  // const subState = useSelector((state: RootState) => state.subscriber);
  //  console.log(value);
  const dispatch = useDispatch();
  const createSubHander: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        //@ts-ignore
        const name = e.target.name.value;
        //@ts-ignore
        const service_type = e.target.service_type.value;
        isValidPhoneNumber(value) &&
          !createSubMutation.isLoading &&
          createSubMutation.mutate(
            {
              id: sub?.id,
              name,
              msisdn: value,
              service_type,
            },
            {
              onSuccess: () => {
                dispatch(close());
              },
            }
          );
      },
      [value, sub]
    );
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
            readOnly={!!sub?.id}
            required
            defaultValue={sub.owner.name}
            aria-required
            sx={inputStyles()}
          ></FilledInput>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            "& .PhoneInput": {
              maxWidth:
                //@ts-ignore
                theme.components?.MuiFilledInput?.styleOverrides?.root.maxWidth,
              height: inputStyles().height,

              "& .PhoneInputInput": {
                ...inputStyles(),
                //@ts-ignore
                ...theme.components?.MuiFilledInput?.styleOverrides?.root,
                padding: "12px !important",
                "&:focus-visible": {
                  outlineColor: theme.palette.primary.main,
                },
              },
            },
          }}
        >
          <InputLabel>Phone</InputLabel>
          <PhoneInput
            name="msisdn"
            required
            defaultCountry={
              sub?.id ? parsePhoneNumber(sub.msisdn)?.country : "GH"
            }
            value={value}
            placeholder="Enter Phone"
            onChange={setValue}
            international
            withCountryCallingCode
          ></PhoneInput>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Select Service Type</InputLabel>
          <TextField
            select
            id="service_type"
            variant="filled"
            name="service_type"
            required
            defaultValue={sub.service_type}
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
