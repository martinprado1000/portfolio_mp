import { NavLink } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
// import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
// import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
// import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import { useAuthContext } from "src/contexts/AuthUserContext";
import { RolesEnum } from "src/contexts/interfaces/users.interfaces";

const mainListItemsAdmin = [
  { text: "Home", to: "/home", icon: <HomeRoundedIcon /> },
  { text: "Users", to: "/users", icon: <PeopleRoundedIcon /> },
  { text: "Profile", to: "/profile", icon: <PersonRoundedIcon /> },
  // { text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
  // { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const mainListItems = [
  { text: "Home", to: "/home", icon: <HomeRoundedIcon /> },
  { text: "Profile", to: "/profile", icon: <PersonRoundedIcon /> },
  // { text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
  // { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

// const secondaryListItemsAdmin = [
//   { text: "Settings", icon: <SettingsRoundedIcon /> },
//   { text: "About", icon: <InfoRoundedIcon /> },
//   { text: "Feedback", icon: <HelpRoundedIcon /> },
// ];

{
  /* ***** MENU ********************************** */
}
export function MenuContent() {
  const { userAuth } = useAuthContext();

  const isAdmin = userAuth?.roles?.includes(RolesEnum.SUPERADMIN) || userAuth?.roles?.includes(RolesEnum.ADMIN);
  const listItems = isAdmin ? mainListItemsAdmin : mainListItems;

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      {/* ***** Top menu ***** */}
      <List dense>
        {listItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                "&.active": {
                  bgcolor: "action.selected", // Color cuando está activo
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* ***** Buttom menu ****** */}
      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={NavLink}
              to={item.text}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
}

{
  /* ***** RESPONSIVE MENU ********************************** */
}
export function MenuContentCompact() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      {/* ***** Top menu ***** */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={NavLink}
              to={item.to}
              sx={{
                "&.active": {
                  bgcolor: "action.selected", // Color cuando está activo
                },
              }}
            >
              <ListItemIcon sx={{ my: 1 }}>{item.icon}</ListItemIcon>
              {/* <ListItemText primary={item.text} /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* ***** Buttom menu ****** */}
      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={NavLink}
              to={item.text}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
}

// export default function MenuContent() {
//   return (
//     <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
//       <List dense>
//         {mainListItems.map((item, index) => (
//           <ListItem key={index} disablePadding sx={{ display: 'block' }}>
//             <ListItemButton selected={index === 0}>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <List dense>
//         {secondaryListItems.map((item, index) => (
//           <ListItem key={index} disablePadding sx={{ display: 'block' }}>
//             <ListItemButton>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Stack>
//   );
// }
