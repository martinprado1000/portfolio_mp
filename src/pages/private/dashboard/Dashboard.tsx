import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid-pro/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// import NavbarMenu from "../../layouts/menu/navbar-menu/NavbarMenu";
// import SideMenu from "../../layouts/menu/side-menu/SideMenu";
import AppTheme from "src/pages/shared-theme/AppTheme";
import Header from "src/pages/layouts/header/Header";
import DashboardMainGrid from "./components/DashboardMainGrid";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

type BackgroundColor = string | string[];
declare module "@mui/material/styles" {
  interface Theme {
    vars: {
      shape: any;
      palette: {
        action: any;
        primary: any;
        success: any;
        text: any;
        divider: any;
        background: {
          default: readonly string[] | BackgroundColor | readonly BackgroundColor[] | undefined;
          paper: readonly string[] | BackgroundColor | readonly BackgroundColor[] | undefined;
          defaultChannel: string;
        };
      };
    };
  }
}

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>

        {/* -------- Menu lateral -------------------------------------------------------------------------------------- */}
        {/* <SideMenu /> */}  {/* Se carga desde app */} 

        {/* -------- Menu responsivo ----------------------------------------------------------------------------------- */}
        {/* <NavbarMenu /> */}  {/* Se carga desde app */} 

        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* -------- Menu superior ---------------------------------------------------------------------------------- */}
            <Header />

            {/* -------- Body ------------------------------------------------------------------------------------------- */}
            <DashboardMainGrid />

          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
