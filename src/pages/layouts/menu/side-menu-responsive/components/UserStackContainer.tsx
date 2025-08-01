import * as React from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  Menu,
  MenuItem as MuiMenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import { listItemIconClasses } from "@mui/material/ListItemIcon";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import MenuButton from "src/pages/layouts/menu/common/MenuButton";
import { useAuthContext } from "src/contexts/AuthUserContext";
import type { UserType } from "src/contexts/interfaces/users.interfaces";
 
// -------------------- TYPES --------------------
interface MenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

interface StackProps extends MenuProps {
  userAuth: UserType;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}


// -------------------- ESTILES --------------------
const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});


// -------------------- COMPONENTS --------------------
function UserMenu({ anchorEl, handleClose }: MenuProps) {
  const { userLogOut } = useAuthContext();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleLogOut = () => {
    userLogOut();
    navigate("/sign-in");
  };

  const handleClickProfile = () => {
    handleClose();
    navigate("/profile");
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      sx={{
        [`& .${listClasses.root}`]: { padding: "4px" },
        [`& .${paperClasses.root}`]: { padding: 0 },
        [`& .MuiDivider-root`]: { margin: "4px -4px" },
      }}
    >
      <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
      <MenuItem onClick={handleClickProfile}>My account</MenuItem>
      <Divider />
      <MenuItem
        onClick={handleClose}
        sx={{
          [`& .${listItemIconClasses.root}`]: {
            ml: "auto",
            minWidth: 0,
          },
        }}
      >
        <ListItemText onClick={handleLogOut}>Logout</ListItemText>
        <ListItemIcon>
          <LogoutRoundedIcon fontSize="small" />
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
}

function OptionsMenuUser(props: StackProps) {
  return (
    <>
      <MenuButton
        aria-label="Open menu"
        onClick={props.handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <UserMenu anchorEl={props.anchorEl} handleClose={props.handleClose} />
    </>
  );
}

function UserStack({ userAuth, anchorEl, handleClick, handleClose }: StackProps) {
  return (
    <Stack
      direction="row"
      sx={{
        p: 2,
        gap: 1,
        alignItems: "center",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Avatar
        sizes="small"
        alt={userAuth.name}
        src="/static/images/avatar/7.jpg"
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: "auto" }}>
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: "16px" }}>
          {userAuth.name}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {userAuth.email}
        </Typography>
      </Box>
      <OptionsMenuUser
        userAuth={userAuth}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      />
    </Stack>
  );
}

function UserStackResponsive({ userAuth, anchorEl, handleClick, handleClose }: StackProps) {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <Avatar
            sizes="small"
            alt={userAuth.name}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
        </IconButton>
      </Stack>

      <UserMenu anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
}

// -------------------- CONTENEDOR PRINCIPAL --------------------

export function UserStackContainer({ responsive }: { responsive?: boolean }) {
  const { userAuth } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!userAuth) return null;

  return responsive ? (
    <UserStackResponsive
      userAuth={userAuth}
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
    />
  ) : (
    <UserStack
      userAuth={userAuth}
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
    />
  );
}
