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
        // Rutas sin sesión (públicas)
        {
          element: <SessionRoute />,
          children: [
            { path: "/sign-in", element: <SignIn /> },
            { path: "/sign-up", element: <SignUp /> },
          ],
        },

        // Rutas protegidas: solo usuario logeados y cualquier rol de usuario.
        {
          element: <ProtectedRoute role={RolesEnum.USER} />,
          // children: [
          //   { path: "/", element: <Dashboard /> },
          //   { path: "/home", element: <Dashboard /> },
          //   { path: "/profile", element: <ProfilePage /> },
          //   {
          //     path: "/dashboard",
          //     element: (
          //       <Suspense fallback={<DashboardLoading />}>
          //         <Dashboard />
          //       </Suspense>
          //     )
          //   },
          // ],
          // USANDO LA FUNCION SuspendedDashboard PUEDO RESUMIR EL CODIGO DE ARRIBA DE LA SIGUIENTE MANERA
          children: [
            {
              element: <MenuRoute />, //
              children: [
                // { path: "/", element: SuspendedDashboard },
                // { path: "/home", element: SuspendedDashboard },
                // { path: "/dashboard", element: SuspendedDashboard },
                // { path: "/profile", element: <Profile /> },
              ],
            },
          ],
        },

        // Rutas protegidas: solo usuario logeados y con rol: ADMIN y SUPERADMIN
        {
          element: <ProtectedRoute role={RolesEnum.ADMIN} />,
          children: [
            {
              element: <MenuRoute />,
              children: [{ path: "/users", element: <Users /> }],
            },
          ],
        },

        // Rutas publicas
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/errorPage", element: <ErrorPage /> },
        { path: "/fatalErrorPage", element: <FatalErrorPage /> },
        { path: "/testpage", element: <TestPage /> },
        { path: "*", element: <ErrorPage /> }, // 404
      ],

      errorElement: <ErrorPage />, // Manejo global de errores
    },
  ]
  // {
  //   future: {
  //     v7_startTransition: true, // Bandera para el warning
  //   },
  // }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// // Configuración del router con future flag y rutas
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <AuthUserProvider>
//         <UsersProvider>
//             {/* Las rutas específicas se definen en "children" más abajo */}
//             <Outlet />
//         </UsersProvider>
//       </AuthUserProvider>
//     ),
//     children: [
//       // Rutas de sesión (públicas)
//       {
//         element: <SessionRoute />,
//         children: [
//           { path: "/register", element: <RegisterPage /> },
//           { path: "/login", element: <LoginPage /> },
//           { path: "/recoveryPassword", element: <RecoveryPasswordPage /> },
//         ],
//       },
//       // Rutas protegidas para USER
//       {
//         element: <ProtectedRoute rol="USER" />,
//         children: [
//           { path: "/", element: <HomePage /> },
//           { path: "/home", element: <HomePage /> },
//           { path: "/profile", element: <ProfilePage /> },
//         ],
//       },
//       // Rutas protegidas para ADMIN
//       {
//         element: <ProtectedRoute rol="ADMIN" />,
//         children: [
//           { path: "/users", element: <UsersPage /> },
//           { path: "/usersAdd", element: <UsersAddPage /> },
//           { path: "/users/:id", element: <UsersEditPage /> },
//         ],
//       },
//       // Otras rutas (públicas)
//       { path: "/errorPage", element: <ErrorPage /> },
//       { path: "/fatalErrorPage", element: <FatalErrorPage /> },
//       { path: "/test", element: <Test /> },
//       { path: "*", element: <ErrorPage /> }, // 404
//     ],
//     errorElement: <ErrorPage />, // Manejo global de errores
//   },
// ], {
//   future: {
//     v7_startTransition: true, // Bandera para el warning
//   },
// });

// function App() {
//   return <RouterProvider router={router} />;
// }

//export default App;
