import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import AppTheme from "src/pages/shared-theme/AppTheme";
import ColorModeSelect from "src/pages/shared-theme/ColorModeSelect";
import ForgotPassword from "./ForgotPassword";
import { MpIcon } from "src/components/customIcons/MpIcon";
import { useAuthContext } from "src/contexts/AuthUserContext";
import { ActionUserAuthType } from "src/contexts/interfaces/userAuth.interfaces";

//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",

  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { actionUserAuth } = useAuthContext();

  interface FormData {
    email: string;
    password: string;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      // Con defaultValues le podemos asignar valores por defecto al campo que deseamos, si no queremos asignar ningun valor por defecto ejecuto el useForm sin ningun valor: useForm();
      //marca: marcaEdit
      //apellido: '',
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginUser = async (data: FormData) => {
    try {
      let res = await actionUserAuth(ActionUserAuthType.login, data);
      if (!res) {
        navigate("/home");
        return;
      }
      Swal.fire({
        title: res.message,
        icon: "warning", // succes , warning , info , question, error
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error inesperado en el sistema",
        icon: "error", // succes , warning , info , question, error
        timerProgressBar: true,
      });
      navigate("/fatalErrorPage");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined" sx={{ overflowY: "auto", maxHeight: "100%" }}>
          {/* <SitemarkIcon /> */}
          <MpIcon />

          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(loginUser)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                fullWidth
                variant="outlined"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El campo email es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <Typography sx={{ color: "#dc3545" }}>
                  {errors.email.message}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                autoComplete="current-password"
                autoFocus
                fullWidth
                variant="outlined"
                type="password"
                placeholder="••••••"
                //placeholder="Ingrese una contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La campo contraseña es requerido",
                  },
                  // minLength: {
                  //   value: 8,
                  //   message: "La contraseña debe tener al menos 8 caracteres",
                  // },
                  // maxLength: {
                  //   value: 20,
                  //   message: "La contraseña debe tener menos de 20 caracteres",
                  // },
                })}
              />
              {errors.password && (
                <Typography sx={{ color: "#dc3545" }}>
                  {errors.password.message}
                </Typography>
              )}
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              //onClick={validateInputs}
            >
              Sign in
            </Button>
          </Box>
          <ForgotPassword open={open} handleClose={handleClose} />
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Forgot your password?
          </Link>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button> */}
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                component={NavLink}
                to="/sign-up"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
