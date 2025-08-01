import { useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    // color: (theme.vars || theme).palette.action.disabled,
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

const getRouteName = (pathname: string) => {
  const route = pathname.split("/").pop(); // Obtiene el último segmento de la ruta
  switch (route) {
    case "users":
      return "Users";
    case "home":
      return "Home";
    case "profile":
      return "Profile";
    default:
      return "Home"; // Valor por defecto
  }
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const currentRouteName = getRouteName(location.pathname);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        {currentRouteName}
      </Typography>
    </StyledBreadcrumbs>
  );
}
