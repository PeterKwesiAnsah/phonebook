import React, { ReactChild } from "react";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

declare module "@mui/material/styles/createPalette" {
  interface status {
    pending: string;
    complete: string;
    cancelled: string;
    successful: string;
  }
  interface TypeBackground {
    bin: string;
    dark_bin: string;
    dark: string;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    border?: PaletteColorOptions;
    status?: status;
  }
  interface Palette {
    tertiary: PaletteColor;
    border: PaletteColor;
    status: PaletteColor;
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#F89722",
      light: "#E1A136",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#142B51",
      light: "#1D3865",
      dark: "#333333",
    },
    tertiary: {
      main: "#8F98AA",
      light: "#D0D4D8",
    },
    error: {
      main: "#F80031",
      light: "#FF0000",
    },

    background: {
      paper: "#FFFFFF",
      bin: "#F4F5F7",
      dark_bin: "#E1E4E7",
      dark: "#000000",
    },
    border: {
      main: "#E9ECEF",
      light: "#D8D8D8",
    },
  },
});
//@ts-ignore
theme = createTheme(theme, {
  typography: {
    fontFamily: "Mulish,sans-serif",
    h1: {
      fontWeight: 700,
      fontStyle: "normal",
      lineHeight: "32.68px",
      fontSize: "1.25rem",
      color: theme.palette.background.dark,
      fontFamily: "Mulish",
    },
    h2: {
      fontFamily: "Mulish",
      fontWeight: 600,
      color: theme.palette.background.dark,
      fontSize: "1.125rem",
    },
    h3: {
      fontFamily: "Mulish",
      fontWeight: 600,
      color: theme.palette.background.dark,
      fontSize: "1rem",
    },
    h4: {
      fontWeight: 700,
      fontStyle: "normal",
      lineHeight: "32.68px",
      fontSize: "0.875rem",
      color: theme.palette.background.dark,
      fontFamily: "sans-serif",
      textTransform: "capitalize",
    },
    subtitle1: {
      fontFamily: "Mulish",
      fontWeight: 400,
      fontSize: "0.875rem",
      color: theme.palette.secondary.main,
    },
    subtitle2: {
      color: theme.palette.tertiary.main,
      fontFamily: "Mulish",
      fontWeight: 400,
      fontSize: "0.875rem",
    },
    button: {
      fontSize: "0.875rem",
      textTransform: "none",
    },
  },
  components: {
    //@ts-ignore
    MuiDataGrid: {
      defaultProps: {
        checkboxSelection: false,
        disableSelectionOnClick: true,
        disableColumnFilter: true,
        disableColumnMenu: true,
        disableColumnSelector: true,
      },
      styleOverrides: {
        root: {
          background: theme.palette.background.paper,
          "& .MuiDataGrid-footerContainer": {
            justifyContent: "center",
          },

          borderColor: theme.palette.border.main,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
        },
        columnHeader: {
          color: theme.palette.tertiary.main,
          fontFamily: "Mulish",
          fontWeight: 400,
          fontSize: "0.875rem",
        },
        columnHeaders: {
          background: "#F6F9FC",
          // minHeight: "39px  !important",
          // maxHeight: "39px !important",
          // height: "39px",
        },

        cell: {
          //borderTop: '1px solid #E9ECEF',
          borderBottom: "1px solid #E9ECEF",
          fontFamily: "Mulish",
          fontWeight: 400,
          fontSize: "0.875rem",
          color: theme.palette.secondary.main,
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: theme.palette.tertiary.main,
          fontWeight: 600,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 0,
          paddingTop: 0,
          width: "100%",
          height: "3.375rem",
          maxWidth: "21.8125rem",
          "& .MuiFilledInput-root": {
            height: "100%",
          },
          //@ts-ignore,
          "& .MuiSelect-select": {
            paddingTop: "12px",
            paddingBottom: "12px",
          },
          "& .MuiSelect-icon": {
            top: "unset",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#f8f9fe",
        },
        a: {
          textDecoration: "none",
          color: "currentColor",
        },
        ul: {
          listStyle: "none",
          paddingLeft: 0,
        },
        li: {
          transition: "all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s",
          backfaceVisibility: "hidden",
          WebkitFilter: "blur(0)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 40px",
          fontFamily: "sans-serif",
          fontSize: "14px",
          //fontWeight: 600,
          borderRadius: 0,
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "24px",
          height: "24px",
          //fill: "#525F7F"
        },
      },
    },

    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          //border: 'none',
          borderRadius: "6px",
          maxWidth: "21.8125rem",
          width: "100%",
          fontFamily: "Mulish",
          fontWeight: 600,
          fontSize: "0.875rem",
          color: theme.palette.secondary.main,
          //@ts-ignore
          border: "1px solid #DEE2E6",
          boxShadow:
            "0px 0px 1px rgba(0, 0, 0, 0.02), 0px 1px 3px rgba(50, 50, 93, 0.15)",
          "&:hover": {
            backgroundColor: theme.palette.background.paper,
          },
          "&.Mui-focused": {
            border: "2px solid " + theme.palette.primary.main,
            backgroundColor: theme.palette.background.paper,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.light,
          fontSize: "14px",
          weight: 600,
          marginBottom: "7px",
        },
      },
    },
  },
});

const Theme = ({ children }: { children: ReactChild }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
