// Tipos para las acciones
export enum ActionUserEnum {
  get = 'get',
  getByTerm = 'getByTerm',
  add = 'add',
  edit = 'edit',
  delete = 'delete',
  recoveryPassword = 'recoveryPassword',
}

export type ActionUserTypes = {
  (action: ActionUserEnum.get): Promise<UserType[] | undefined>;
  (action: ActionUserEnum.getByTerm, id: string): Promise<UserType | undefined>;
  (action: ActionUserEnum.add | ActionUserEnum.edit | ActionUserEnum.recoveryPassword , data: UserType): Promise<UserType | ApiErrorType | undefined>;
  (action: ActionUserEnum.delete , id: string): Promise<void>;  // Es void porque no retorna nada el delete
};

export enum RolesEnum {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  USER = 'USER',
}

// Interface para el usuario
export interface UserType {
  id?: string;
  name?: string;
  lastname?: string;
  email?: string;
  roles?: RolesEnum;
  password?: string;
  confirmPassword?: string;
  isNew?: boolean;
  isActive?: boolean | "Activo" | "Inactivo";  // Agrego "Activo" e "Inactivo" como tipo porque eso es lo que retorna el formulario.
}

export interface ApiErrorType {
  message: string;
  error: string;
  statusCode: number;
}

// Interface para tipar el contexto
export interface UsersContextType {
  getUsers: () => Promise<void>;
  users: UserType[] | null;
  setUsers: React.Dispatch<React.SetStateAction<UserType[] | null>>;
  roles: RolesEnum[];
  actionUser: <T = any>(action: ActionUserEnum, data?: any, id?: string) => Promise<T | undefined>;
  loading: boolean;
  error: string | null;
}