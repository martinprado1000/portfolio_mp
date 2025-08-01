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
//import Checkbox from "@mui/material/Checkbox";

import AppTheme from "src/pages/shared-theme/AppTheme";
import ColorModeSelect from "src/pages//shared-theme/ColorModeSelect";
import { useAuthContext } from "src/contexts/AuthUserContext";
import { ActionUserAuthType } from "src/contexts/interfaces/userAuth.interfaces";
import { MpIcon } from "src/components/customIcons/MpIcon";

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
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const { actionUserAuth } = useAuthContext();

  interface FormData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormData>({});

  const registerUser = async (data: FormData) => {
    try {
      let res = await actionUserAuth(ActionUserAuthType.register, data);
      if (!res) {
        navigate("/home");
        return;
      }
      Swal.fire({
        title: res.message,
        icon: "warning",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error inesperado en el sistema",
        icon: "error",
        timerProgressBar: true,
      });
      navigate("/fatalErrorPage");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" sx={{ overflowY: "auto", maxHeight: "100%" }}>
         
          <MpIcon />

          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(registerUser)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                autoComplete="name"
                fullWidth
                id="name"
                placeholder="Ingrese su nombre"
                {...register("name", {
                  required: {
                    value: true,
                    message: "La campo nombre es requerido",
                  },
                  pattern: {
                    value: /^[A-Za-zñÑ]+$/,
                    message:
                      "El campo nombre solo puede contener letras sin espacios ni caracteres especiales",
                  },
                  minLength: {
                    value: 2,
                    message: "El campo nombre debe tener mas de 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "El campo nombre debe tener menos de 20 caracteres",
                  },
                })}
              />
              {errors.name && (
                <Typography sx={{ color: "#dc3545" }}>
                  {errors.name.message}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastname">Lastname</FormLabel>
              <TextField
                autoComplete="lastname"
                fullWidth
                id="lastname"
                placeholder="Ingrese su apellido"
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "La campo apellido es requerido",
                  },
                  pattern: {
                    value: /^[A-Za-zñÑ]+$/,
                    message:
                      "El campo apellido solo puede contener letras sin espacios ni caracteres especiales",
                  },
                  minLength: {
                    value: 2,
                    message: "El campo apellido debe tener mas de 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "El campo apellido debe tener menos de 20 caracteres",
                  },
                })}
              />
              {errors.lastname && (
                <Typography sx={{ color: "#dc3545" }}>
                  {errors.lastname.message}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                fullWidth
                id="email"
                autoComplete="email"
                variant="outlined"
                placeholder="your@email.com"
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
                fullWidth
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La campo contraseña es requerido",
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "La contraseña debe tener menos de 20 caracteres",
                  },
                })}
              />
              {errors.password && (
                <Typography sx={{ color: "#dc3545" }}>
                  {errors.password.message}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
              <TextField
                fullWidth
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="new-confirmPassword"
                variant="outlined"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "La campo confirmar contraseña es requerido",
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "La contraseña debe tener menos de 20 caracteres",
                  },
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                })}
              />
              {errors.confirmPassword && (
                <Typography sx={{ color: "#dc3545" }}>
                  {errors.confirmPassword.message}
                </Typography>
              )}
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              //onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button> */}
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                component={NavLink}
                to="/sign-in"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
