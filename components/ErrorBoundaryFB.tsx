import { Box, Typography, Button } from "@mui/material";

export function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <Box role="alert">
      <Typography color="error" variant="subtitle2">
        Something went wrong:
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          window.location.reload();
        }}
      >
        Try again
      </Button>
    </Box>
  );
}
