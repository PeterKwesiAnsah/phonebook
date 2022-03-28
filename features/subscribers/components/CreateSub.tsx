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
  Typography,
} from "@mui/material";
import { services } from ".";
import { inputStyles } from "../../../utils";
import { useCreateSub, useGetSub, usePhone } from "../hooks";
import { close } from "../subscriberSlice";
import "react-phone-number-input/style.css";
import PhoneInput, { Value } from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { parsePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
export const CreateSub = () => {
  const theme = useTheme();
  //@ts-ignore
  const { color, fontWeight, fontFamily, maxWidth } =
    theme.components?.MuiFilledInput?.styleOverrides?.root;
  const createSubMutation = useCreateSub();
  const sub = useGetSub();
  const [value, setValue, isValidPhone] = usePhone(sub.msisdn);
  const dispatch = useDispatch();
  const createSubHander: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        //@ts-ignore
        const name = e.target.name.value;
        //@ts-ignore
        const service_type = e.target.service_type.value;
        value &&
          isValidPhone &&
          isValidPhoneNumber(value) &&
          !createSubMutation.isLoading &&
          createSubMutation.mutate(
            {
              id: sub?.id,
              name,
              msisdn: value!,
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
              //@ts-ignore
              ...theme.components?.MuiFilledInput?.styleOverrides?.root,
              //@ts-ignore
              ...inputStyles(),
              padding: "12px !important",
              "&:focus-within":
                value && value.length > 0 && !isValidPhone
                  ? {
                      border: "2px solid " + theme.palette.error.main,
                    }
                  : //@ts-ignore
                    theme.components?.MuiFilledInput?.styleOverrides?.root[
                      "&.Mui-focused"
                    ],

              "& .PhoneInputInput": {
                height: "100%",
                maxHeight: inputStyles().height,
                border: "transparent",
                fontWeight,
                color,
                fontFamily,

                "&:focus-visible": {
                  outlineColor: "transparent",
                },
              },
            },
          }}
        >
          <InputLabel htmlFor="msisdn">Phone</InputLabel>
          <PhoneInput
            name="msisdn"
            required
            defaultCountry={
              sub?.id ? parsePhoneNumber(sub.msisdn)?.country : "GH"
            }
            value={value as Value}
            placeholder="Enter Phone"
            onChange={setValue}
            international
            withCountryCallingCode
          ></PhoneInput>
          {value && value.length > 0 && !isValidPhone && (
            <Typography variant="subtitle2" color="error">
              Phone Invalid
            </Typography>
          )}
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
      <Box
        sx={{
          maxWidth,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            ml: "auto",
            display: "block",
            cursor: createSubMutation.isLoading ? "not-allowed" : "pointer",
            opacity: createSubMutation.isLoading ? 0.7 : 1,
          }}
        >
          {createSubMutation.isLoading
            ? "Hang on"
            : sub.id
            ? "Update"
            : "Create"}
        </Button>
        {createSubMutation.isError && (
          <Typography variant="subtitle2" color="error">
            {!sub?.id
              ? "Phone Already Exists or An Error occurred"
              : "An Error occured"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
