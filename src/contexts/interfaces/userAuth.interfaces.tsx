import { RolesEnum, type UserType } from "./users.interfaces"

export interface UserAuthType {
    id?: string;
    name?: string;
    lastname?: string;
    email?: string;
    roles?: RolesEnum;
    isNew?: boolean;
    isActive?: boolean;
    token?: string;
}

export enum ActionUserAuthType {
  login = 'login',
  register = 'register',
  checkUserAuth = 'checkUserAuth',
}

export interface AuthUserContextType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  userAuth: UserAuthType | null;
  setUserAuth: React.Dispatch<React.SetStateAction<UserAuthType | null>>;
  loading: boolean;
  actionUserAuth: ( action: ActionUserAuthType, data?: UserType ) => Promise<any>;
  userLogOut: () => void;
}