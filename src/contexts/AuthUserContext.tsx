const URL_BACK = import.meta.env.VITE_URL_BACK;
import { createContext, useContext, useEffect, useState } from "react";

import { ActionUserAuthType, type AuthUserContextType, type UserAuthType } from "./interfaces/userAuth.interfaces"
import type { UserType } from "./interfaces/users.interfaces";

const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

// Este es nuestro hook que exporta el contexto
export function useAuthContext() {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthUserProvider");
  }
  return context; // TypeScript ahora sabe que context es AuthUserContextType
}

// Tipar las props del provider
interface AuthUsersProviderPropsType {
  children: React.ReactNode;
}

// Provider
export function AuthUserProvider({ children }: AuthUsersProviderPropsType ) {
  const [isAuth, setIsAuth] = useState(false);
  const [userAuth, setUserAuth] = useState<UserAuthType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");
    if (userSession) {
      setUserAuth(JSON.parse(userSession));
      setIsAuth(true)
      setLoading(false);
      return
    }
    setLoading(false);
  }, []);

  let res : Response;

  const actionUserAuth = async (action: ActionUserAuthType, data?: UserType ) => {
    switch (action) {
      case ActionUserAuthType.login:
      case ActionUserAuthType.register: {
        res = await fetch(`${URL_BACK}/api/auth/${action}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        break;
      }

      case ActionUserAuthType.checkUserAuth: {
        //const userSession = JSON.parse(sessionStorage.getItem("user"));
        if (!userAuth) { // Manejar el caso donde no hay usuario autenticado
          throw new Error("No authenticated user");
        }
        res = await fetch(`${URL_BACK}/api/auth/${action}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userAuth.token}`,
            "Content-Type": "application/json",
          },
        });
        break;
      }
    }

    const responsBackend = await res.json(); //Transformo a JSON la respuesta
    if (res.status !== 201 && res.status !== 200) { // Usuario no registrado
      setIsAuth(false);
      setUserAuth(null);
      setLoading(true);
      sessionStorage.removeItem("user");
      return responsBackend;
    } else {
      //setUserAuth({rol:responsBackend.rol}) // Cargo el valor del rol para poder direccionar a la ruta indicada
      //responsBackend.rol == "user" ? navigate("/home") : navigate("/products");
      setIsAuth(true);
      setUserAuth(responsBackend);
      setLoading(false);
      sessionStorage.setItem("user", JSON.stringify(responsBackend));
      return;
    }
  };

  const userLogOut = () => {
    setIsAuth(false);
    setUserAuth(null);
    setLoading(true);
    sessionStorage.removeItem("user");
    return;
  };

  return (
    <AuthUserContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userAuth,
        setUserAuth,
        loading,
        actionUserAuth,
        userLogOut,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}
