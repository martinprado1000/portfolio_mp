import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthUserContext";
import { UserAuthType } from "../contexts/interfaces/userAuth.interfaces";
import { RolesEnum } from "../contexts/interfaces/users.interfaces";

interface ProtectedRouteProps {
  role: RolesEnum;
}

export function ProtectedRoute({ role }: ProtectedRouteProps) {

  const { userAuth, userLogOut } = useAuthContext();

  const userSession: UserAuthType = JSON.parse(sessionStorage.getItem("user") || "null" );

  if (!userSession || !userSession.roles) {
    return <Navigate to="/sign-in" replace />; // replace, borra el historial de navegación.
  }
  
  switch (role) {
    case RolesEnum.SUPERADMIN:
      if (userSession.roles.includes(RolesEnum.SUPERADMIN)) {
        return <Outlet />;
      }
      break;

    case RolesEnum.ADMIN:
      if (
        userSession.roles.includes(RolesEnum.SUPERADMIN) ||
        userSession.roles.includes(RolesEnum.ADMIN)
      ) {
        return <Outlet />;
      }
      break;

    case RolesEnum.USER:
      if (
        userSession.roles.includes(RolesEnum.SUPERADMIN) ||
        userSession.roles.includes(RolesEnum.ADMIN) ||
        userSession.roles.includes(RolesEnum.OPERATOR) ||
        userSession.roles.includes(RolesEnum.USER) 
      ) {
        return <Outlet />;
      }

      break;
  }
  console.log({ Error: "No puede consumir este recurso" });
  userLogOut()
  return <Navigate to="/sign-in" replace />;
}
