import React from "react";
import SideMenu from "../pages/layouts/menu/side-menu/SideMenu";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import NavbarMenu from "../pages/layouts/menu/navbar-menu/NavbarMenu";
import AppTheme from "../pages/shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";

export const MenuRoute = () => {
  return (
    <AppTheme> {/* Envuelve todo en AppTheme */}
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <NavbarMenu />
        <SideMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </AppTheme>
  );
};