import { useNavigate } from "react-router-dom";

import { Button, CssBaseline, Typography } from "@mui/material";

import AppTheme from "src/pages/shared-theme/AppTheme";

export function FatalErrorPage(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <div className="container mt-5">
        <Typography variant="h2">FatalErrorPage: System error</Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{  mt: 3 }}
          onClick={() => navigate("/")}
        >
          Return to the home page
        </Button>
      </div>
    </AppTheme>
  );
}
