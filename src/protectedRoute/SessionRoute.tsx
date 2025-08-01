import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../contexts/interfaces/users.interfaces";

export function SessionRoute() {

  const session = sessionStorage.getItem("user");
  const userSession: UserType | null = session ? JSON.parse(session) : null;

  if (userSession) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}