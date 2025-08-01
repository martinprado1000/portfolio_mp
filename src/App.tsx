import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorPage } from "./pages/public/error-page/ErrorPage.jsx";
import { FatalErrorPage } from "./pages/public/fatal-error-page/FatalErrorPage.jsx";
import Home from "./pages/public/home/Home.js";

const router = createBrowserRouter(
  [
    {
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
