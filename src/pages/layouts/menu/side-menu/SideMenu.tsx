import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import SelectContent from "src/pages/layouts/menu/common/SelectContent";
import { MenuContent } from "src/pages/layouts/menu/common/MenuContent";
import CardAlert from "src/pages/layouts/menu/common/CardAlert";
import { UserStack } from "./components/UserStack";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >

        {/* ***** Menu with logo  ***************************************************** */}
        <SelectContent />

      </Box>

      <Divider />

      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ***** Menu, button and top ***************************************************** */}
        <MenuContent />

        {/* ***** Card ***************************************************** */}
        <CardAlert />
      </Box>

      {/* ***** User ***************************************************** */}
      <UserStack />
    </Drawer>
  );
}
