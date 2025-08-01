import "./App.css";
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { AuthUserProvider } from "./contexts/AuthUserContext";
import { UsersProvider } from "./contexts/UsersContext";

import { ProtectedRoute } from "./protectedRoute/ProtectedRoute";
import { SessionRoute } from "./protectedRoute/SessionRoute";
import { MenuRoute } from "./protectedRoute/MenuRoute";

import { DashboardLoading } from "./components/dashboard-loading/DashboardLoading";
const Dashboard = lazy(() => import("./pages/private/dashboard/Dashboard")); // Lo importo de esta manera porque tiene lazy loading.
import SignIn from "./pages/auth/sign-in/SignIn";
import SignUp from "./pages/auth/sign-up/SignUp";
import Users from "./pages/private/users/Users";
import Profile from "./pages/private/profile/Profile";
import { ErrorPage } from "./pages/public/error-page/ErrorPage.jsx";
import { FatalErrorPage } from "./pages/public/fatal-error-page/FatalErrorPage.jsx";
import { TestPage } from "./pages/public/test-page/TestPage.jsx";
import { RolesEnum } from "./contexts/interfaces/users.interfaces";
import Home from "./pages/public/home/Home.js";

const SuspendedDashboard = (
  <Suspense fallback={<DashboardLoading />}>
    <Dashboard />
  </Suspense>
);

// Configuración del router
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <AuthUserProvider>
          <UsersProvider>
            {/* Las rutas específicas se definen en "children" más abajo */}
            <Outlet />
          </UsersProvider>
        </AuthUserProvider>
      ),
      children: [

        // Rutas publicas
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/errorPage", element: <ErrorPage /> },
        { path: "/fatalErrorPage", element: <FatalErrorPage /> },
        { path: "*", element: <ErrorPage /> }, // 404
      ],

      errorElement: <ErrorPage />, // Manejo global de errores
    },
  ]
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
