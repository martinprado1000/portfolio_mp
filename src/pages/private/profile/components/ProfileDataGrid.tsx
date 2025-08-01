import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import {
  Stack,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";

//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useUsersContext } from "src/contexts/UsersContext";
import { useAuthContext } from "src/contexts/AuthUserContext";
import type { UserAuthType } from "src/contexts/interfaces/userAuth.interfaces";
import {
  ActionUserEnum,
  RolesEnum,
  type UserType,
} from "src/contexts/interfaces/users.interfaces";

function AccountInfo({ userAuth }: { userAuth: UserAuthType }) {
  return (
    <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
      <Stack spacing={2} alignItems="center">
        <Avatar
          //src={userAuth}
          sx={{ width: 120, height: 120, mb: 2 }}
        />
        <Typography variant="h6">{userAuth.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {userAuth.roles}
        </Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
        <Box sx={{ width: "100%" }}>
          <Typography variant="body1" fontWeight="bold">
            Email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userAuth.email}
          </Typography>
          <Typography variant="body1" fontWeight="bold" mt={2}>
            {userAuth.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userAuth.lastname}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

function AccountDetailsForm({ userAuth }: { userAuth: UserAuthType }) {
  //const asd = userAuth.roles
  interface FormData {
    name?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    roles?: RolesEnum;
  }

  const navigate = useNavigate();
  const { actionUser, roles } = useUsersContext();
  const [formData, setFormData] = useState<UserType | null>(null);
  const { userLogOut } = useAuthContext();

  useEffect(() => {
    if (userAuth) {
      setFormData(userAuth);
    }
  }, [userAuth]);

  const {
    register,
    formState: { errors }, // Son los valores del objeto error
    watch, // Guarda el valor actual de los inputps
    handleSubmit,
    control,
  } = useForm<FormData>({
    defaultValues: {
      // Con defaultValues le podemos asignar valores por defecto al campo que deseamos, si no queremos asignar ningun valor por defecto ejecuto el useForm sin ningun valor: useForm();
      name: userAuth.name,
      lastname: userAuth.lastname,
      email: userAuth.email,
      password: "",
      confirmPassword: "",
      roles: userAuth?.roles,
    },
  });

  const editProfile = async (data: FormData) => {
    if (!formData) {
      // Evito warning de typescript
      userLogOut();
      navigate("/sign-in");
      throw new Error("No profile, you should log in.");
    }

    const result = await Swal.fire({
      title: "Editando perfil",
      text: "Si edita su perfil debe volver a logearse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, editar",
      cancelButtonText: "Cancelar",
      focusConfirm: true,
    });

    if (result.isConfirmed) {
      if (data.password == "") {
        delete data.password;
        delete data.confirmPassword;
      }
      const res = await actionUser(ActionUserEnum.edit, data, formData.id);
      if (res.error) {
        Swal.fire({
          title: res.message,
          icon: "warning",
          timer: 6000,
          timerProgressBar: true,
        });
        throw new Error(res.message);
      }
      userLogOut();
      navigate("/sign-in");
      return;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Edit profile
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(editProfile)}
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
                message: "El campo nombre debe tener menos de 30 caracteres",
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
                message: "El campo apellido debe tener menos de 30 caracteres",
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
              // required: {
              //   value: true,
              //   message: "La campo contraseña es requerido",
              // },
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
              // required: {
              //   value: true,
              //   message: "El campo confirmar contraseña es requerido",
              // },
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
              maxLength: {
                value: 20,
                message: "La contraseña debe tener menos de 20 caracteres",
              },
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword && (
            <Typography sx={{ color: "#dc3545" }}>
              {errors.confirmPassword.message}
            </Typography>
          )}
        </FormControl>
        {userAuth.roles?.includes(RolesEnum.SUPERADMIN) && (
          <FormControl>
            <FormLabel htmlFor="roles">Role</FormLabel>
            <Controller
              name="roles"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El campo rol es requerido",
                },
              }}
              render={({ field }) => (
                <Autocomplete
                  options={roles}
                  getOptionLabel={(option) => String(option)}
                  value={field.value ?? null}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Seleccioná un rol"
                      error={!!errors.roles}
                    />
                  )}
                />
              )}
            />
            {errors.roles && (
              <Typography sx={{ color: "#dc3545" }}>
                {errors.roles.message}
              </Typography>
            )}
          </FormControl>
        )}

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
          Edit
        </Button>
      </Box>

      {/* <form onSubmit={handleSubmit(editProfile)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              fullWidth
              label="Name"
              variant="standard"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              name="email"
              type="email"
              value={formData?.email || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              fullWidth
              label="Lastname"
              variant="standard"
              name="lastname"
              value={formData?.lastname || ""}
              onChange={handleChange}
            />
          </Grid>

        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Guardar cambios
          </Button>
        </Box>
      </form> */}
    </Paper>
  );
}

// Página principal
export default function ProfileDataGrid() {
  const { userAuth } = useAuthContext();

  if (!userAuth) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <CircularProgress
          size={60}
          thickness={4}
          color="primary"
          sx={{
            //animationDuration: '500ms', // Un poco más lento para mejor percepción
            "&.MuiCircularProgress-root": {
              marginBottom: "16px",
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            fontStyle: "italic",
          }}
        >
          Please wait while we prepare your information.
        </Typography>
      </Box>
    );
  } else {
    return (
      <Stack spacing={3}>
        <Grid container spacing={3}>
          {/* <Grid lg={4} md={6} xs={12}> */}
          <Grid size={{ xs: 12, lg: 3 }}>
            <AccountInfo userAuth={userAuth} />
          </Grid>
          <Grid size={{ xs: 12, lg: 9 }}>
            <AccountDetailsForm userAuth={userAuth} />
          </Grid>
        </Grid>
      </Stack>
    );
  }
}
