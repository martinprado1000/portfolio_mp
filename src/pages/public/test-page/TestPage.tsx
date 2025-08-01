import AppTheme from "src/pages/shared-theme/AppTheme";
import { CssBaseline, Box } from "@mui/material";
import SideMenuResponsive from "../../layouts/menu/side-menu-responsive/SideMenuResponsive"

export function TestPage(props: { disableCustomTheme?: boolean }) {

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>

        <SideMenuResponsive />
        
      </Box>
    </AppTheme>
  );
}
