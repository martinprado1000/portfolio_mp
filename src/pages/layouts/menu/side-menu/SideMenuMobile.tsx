import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import MenuButton from "src/pages/layouts/menu/common/MenuButton";
import { MenuContent } from "src/pages/layouts/menu/common/MenuContent";
import CardAlert from "src/pages/layouts/menu/common/CardAlert";

import { useAuthContext } from "src/contexts/AuthUserContext";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {

  const navigate = useNavigate();
  const { userAuth, userLogOut } = useAuthContext();

  const handleLogOut = () => {
    userLogOut();
    navigate("/sign-in");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        {/* ***** User ***************************************************** */}
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={userAuth?.name}
              //src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {userAuth?.name}
            </Typography>
          </Stack>
          <MenuButton showBadge>
            {/* ***** otifications ***** */}
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>

        <Divider />

        <Stack sx={{ flexGrow: 1 }}>
          {/* ***** Menu, button and top ***************************************************** */}
          <MenuContent />
          <Divider />
        </Stack>

        {/* ***** Card ***************************************************** */}
        <CardAlert />

        {/* ***** LogOut User ***************************************************** */}
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
