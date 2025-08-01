import { UserType } from "../../../../contexts/interfaces/users.interfaces";

interface ValidationData {
  id?: string | number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const specialCharacters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'-]+$/;

export const validateNameFn = (rows: UserType[]) => async (data: ValidationData) => {
  const { id, name } = data;
  if (!name) return `El nombre es obligatorio.`;
  if (name.length < 2) return `El nombre debe ser mayor a 2 caracteres.`;
  if (name.length > 50) return `El nombre debe ser menor a 50 caracteres.`;
  if (/\s/.test(name)) return 'El nombre no puede contener espacios';
  if (!specialCharacters.test(name)) return 'El nombre no puede contener números ni caracteres especiales';
  return null;
};

export const validateLastnameFn = (rows: UserType[]) => async (data: ValidationData) => {
  const { id, lastname } = data;
  if (!lastname) return `El apellido es obligatorio.`;
  if (lastname.length < 2) return `El apellido debe ser mayor a 2 caracteres.`;
  if (lastname.length > 50) return `El apellido debe ser menor a 50 caracteres.`;
  if (/\s/.test(lastname)) return 'El apellido no puede contener números ni espacios';
  if (!specialCharacters.test(lastname)) return 'El apellido no puede contener números ni caracteres especiales';
  return null;
};

export const validateEmailFn = (rows: UserType[]) => async (data: ValidationData) => {
  const { id, email } = data;
  if (!email) return `El email es obligatorio.`;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Formato de email inválido.';
  }  
  const existingEmails = rows
    .filter((row) => (id ? row.id !== id : true))
    .map((row) => row.email?.toLowerCase());
  const exists = email ? existingEmails.includes(email.toLowerCase()) : false;
  return exists ? `El email ${email} ya existe.` : null;
};

export const validatePasswordFn = (rows: UserType[]) => async (data: ValidationData) => {
  const { id, password } = data;
  if (!password) return null;
  if (password.length < 8) return `El password debe ser mayor a 8 caracteres.`;
  if (password.length > 50) return `El password debe ser menor a 50 caracteres.`;
  if (/\s/.test(password)) return 'El password no puede contener espacios';
  const passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordValidate.test(password)) {
    return 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
  }
  return null;
};