const URL_BACK = import.meta.env.VITE_URL_BACK;
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "./AuthUserContext";
import type {
  ApiErrorType,
  UserType,
  UsersContextType,
} from "./interfaces/users.interfaces";
import {
  ActionUserEnum,
  RolesEnum,
} from "./interfaces/users.interfaces";

// Crear el contexto con tipo
const UsersContext = createContext<UsersContextType | undefined>(undefined);
// Este es nuestro hook que exporta el contexto
export function useUsersContext() {
  const context = useContext(UsersContext);
  if (!context) {
    // Hacemos esta validacion para asegurar que los datos sangan del contexto
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
}

// Tipar las props del provider
interface UsersProviderPropsType {
  children: React.ReactNode;
}

const roles = [RolesEnum.SUPERADMIN, RolesEnum.ADMIN, RolesEnum.OPERATOR, RolesEnum.USER];

// Provider
export function UsersProvider({ children }: UsersProviderPropsType) {
  const navigate = useNavigate();
  const { userAuth } = useAuthContext();
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const getUsers = async () => {
    const resUsers = await actionUser(ActionUserEnum.get);
    setUsers(resUsers);
    return;
  };

  const actionUser = async (
    action: ActionUserEnum,
    data?: UserType,
    id?: string
  ): Promise<any> => {

    // Esta validacion no la hago porque se que existe userAuth gracias al protectedRoute.
    // if (!userAuth || !userAuth.token) {
    //   throw new Error("Usuario no autenticado o token faltante");
    // }

    let res: Response; // tipo Response: TypeScript sabe que es un objeto de respuesta que devuelve la API Fetch nativa del navegador. El tipo Response ya incluye todas las propiedades y métodos que necesitas, ejemplo .json

    try {
      switch (action) {
        case ActionUserEnum.get: {
          res = await fetch(`${URL_BACK}/api/users/allUsers/?limit=100`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;
        }

        case ActionUserEnum.getByTerm: {
          res = await fetch(`${URL_BACK}/api/users/${id}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          break;
        }

        case ActionUserEnum.add: {
          res = await fetch(`${URL_BACK}/api/users`, {
            method: "POST",
            //credentials: "include", // Permito que el backend cargue y elimine las cookie en el front
            headers: {
              Authorization: `Bearer ${userAuth!.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          break;
        }

        case ActionUserEnum.edit: {
          res = await fetch(`${URL_BACK}/api/users/${id}`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${userAuth!.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          break;
        }

        case ActionUserEnum.delete:
          {
            res = await fetch(`${URL_BACK}/api/users/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${userAuth!.token}`,
                "Content-Type": "application/json",
              },
            });
            if (res.status === 204) return;
          }
          break;

        case ActionUserEnum.recoveryPassword:
          {
            res = await fetch(`${URL_BACK}/api/recoveryPassword`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            if (res.status === 204) return;
          }
          break;
      }

      const responsBackend: UserType | UserType[] | ApiErrorType | undefined =
      await res.json();

      if (res.status == 401 && responsBackend && "message" in responsBackend) {
        // responsBackend && 'message' in responsBackend  hago esa parte de la validación para que type script sepa que es de tipo ApiError.
        // Si no esta autorizado elimino la cookie
        console.log(responsBackend.message);
        sessionStorage.removeItem("user");
        navigate("/sign-in");
      } else {
        return responsBackend;
      }
    } catch (error) {
      console.log(error);
      navigate("/fatalErrorPage");
    }
  };

  return (
    <UsersContext.Provider
      value={{ getUsers, users, setUsers, actionUser, roles, loading, error }}
    >
      {children}
    </UsersContext.Provider>
  );
}
