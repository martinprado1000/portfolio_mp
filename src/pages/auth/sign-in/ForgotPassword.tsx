import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useUsersContext } from "src/contexts/UsersContext";
import { ActionUserEnum } from "src/contexts/interfaces/users.interfaces";

//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Typography } from "@mui/material";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

// Export ForgotPassword -----------------------------
export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  
  const { actionUser } = useUsersContext();
  const navigate = useNavigate();
 
  const {
    register,
    formState: { errors }, // Son los valores del objeto error
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      // Con defaultValues le podemos asignar valores por defecto al campo que deseamos, si no queremos asignar ningun valor por defecto ejecuto el useForm sin ningun valor: useForm();
      //marca: marcaEdit
      //apellido: '',
    },
  });

  interface FormData {
    email: string;
  }

  const recoveryPass = async (data: FormData) => {
    console.log(data)
    const res = await actionUser(ActionUserEnum.recoveryPassword, data);
    if (res) {
      handleClose(),
      Swal.fire({
        title: res.message,
        icon: "warning", // succes , warning , info , question, error
        timer: 5000,
        timerProgressBar: true,
      });
    } else {
      handleClose(),
      Swal.fire({
        title: "Se envio un correo con la nueva contraseña",
        icon: "success", // succes , warning , info , question, error
        timer: 4000,
        timerProgressBar: true,
      });
      setTimeout(() => {
        navigate("/sign-in");
      }, 4000);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-modal="true"  // Indica que es un modal accesible
      disableEnforceFocus={true}
      slotProps={{
        paper: {
          component: "form",
          noValidate: true, // noValidate: true, evita el error de HTML5
          onSubmit: handleSubmit(recoveryPass),
          sx: { backgroundImage: "none" },
        } as unknown as React.HTMLAttributes<HTMLFormElement>, // Lo tipamos de esta forma para no tener error con noValidate porque no es de MUI.
      }}
    >
      <DialogTitle>Recovery password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          {/* Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password. */}
          Enter your account email address and we'll send you a new password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          margin="dense"
          id="email"
          //name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          {...register("email", {
            required: {
              value: true,
              message: "La campo email es requerido",
            },
            pattern: {
              // pattern es para validar expresiones regulares
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && (
          <Typography sx={{ color:"#dc3545" }}>{errors.email.message}</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
