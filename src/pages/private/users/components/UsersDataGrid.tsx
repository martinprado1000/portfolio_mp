import { forwardRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GridRowModes,
  DataGrid,
  GridEditInputCell,
  GridToolbar,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  type GridRowModesModel,
  type GridRenderEditCellParams,
  //type GridRowEditStopParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Chip, Stack } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import Tooltip, { tooltipClasses, type TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import type { GridColDef } from "@mui/x-data-grid";

//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useUsersContext } from "../../../../contexts/UsersContext";
import { useAuthContext } from "../../../../contexts/AuthUserContext";
import {
  ActionUserEnum,
  RolesEnum,
  type UserType,
} from "../../../../contexts/interfaces/users.interfaces";
import {
  validateNameFn,
  validateEmailFn,
  validateLastnameFn,
  validatePasswordFn,
} from "./ValidationsDataGrid";

// Type props del EditToolbar
interface EditToolbarProps {
  setRows: React.Dispatch<React.SetStateAction<UserType[]>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

//----------------EDIT TOOLBAR--------------------------------------------------------------------------------
const randomId = () => `temp-${Date.now() + Math.random()}`;
function EditToolbar(props: EditToolbarProps) {
  // Obtengo las funciones de EditToolbar
  // setRows: Función para actualizar el estado de las filas del DataGrid, viene con las filas actuales.
  // setRowModesModel: Función para controlar los modos de edición de las filas
  const { setRows, setRowModesModel } = props; // Destructura las 2 funciones
  const handleClick = () => {
    const id = randomId();
    setRows((oldRows: UserType[]) => [
      // oldRows: es el estado actual de las filas
      // Le asigno los siguientes datos a la nueva fila
      {
        id,
        name: "",
        lastname: "",
        email: "",
        roles: RolesEnum.USER,
        isActive: true,
        isNew: true,
      },
      ...oldRows, // Hace una copia de todo el estado actual de las filas
    ]);
    setRowModesModel((oldModel) => ({
      // Establezco el modo de la fila
      ...oldModel, // Le establezco los datos anteriores
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" }, // le establezco el modo edicion (GridRowModes.Edit) a la fila con el id recien generado.
    }));
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const StyledTooltip = styled(
  ({ className, ...props }: { className?: string } & TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

const DataEditInputCell = forwardRef<HTMLDivElement, any>(
  (props: { error?: string } & any, ref) => {
    const { error, ...other } = props;
    return (
      <StyledTooltip open={!!error} title={error}>
        <div ref={ref} style={{ width: "100%", height: "100%" }}>
          <GridEditInputCell {...other} />
        </div>
      </StyledTooltip>
    );
  }
);

function renderEditData(params: GridRenderEditCellParams) {
  return <DataEditInputCell {...params} />;
}

// ****** EXPORT UsersDataGridWithPassword ******************************************************************************
export default function UsersDataGrid() {
  const navigate = useNavigate();
  const { getUsers, users, roles, actionUser } = useUsersContext();
  const { userAuth, userLogOut } = useAuthContext();
  const [rows, setRows] = useState<UserType[]>([]);
  const [rowModesModel, setRowModesModel] = useState<Record<string, any>>({});

  useEffect(() => {
    // Obtenemos los usuarios.
    getUsers();
  }, []);

  // Actualizar rows cuando cambian los usuarios
  useEffect(() => {
    if (users) {
      setRows(users);
    }
  }, [users]);

  let valueOptionsRoles: RolesEnum[];
  userAuth?.roles?.includes(RolesEnum.SUPERADMIN) ? valueOptionsRoles = roles : valueOptionsRoles = [RolesEnum.USER, RolesEnum.OPERATOR];

  const validateName = validateNameFn(rows);
  const validateLastname = validateLastnameFn(rows);
  const validateEmail = validateEmailFn(rows);
  const validatePassword = validatePasswordFn(rows);

  const handleRowEditStop = (params: any, event: any) => {
    // Estos dos parametros los declaro como any porque MUI tiene un bug con en los types
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (id: number | string) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id: number | string) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleCancelClick = (id: number | string) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // ELIMINO USUARIO.
  const handleDeleteClick = (id: string) => async () => {
    const result = await Swal.fire({
      title: "¿Estas seguro?",
      text: "El usuario será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      focusConfirm: true,
    });

    if (result.isConfirmed) {
      const res = await actionUser(ActionUserEnum.delete, undefined, id);

      if (res?.error) {
        Swal.fire({
          title: res.message,
          icon: "error",
          timer: 6000,
          timerProgressBar: true,
        });
        throw new Error(res.message);
      }

      setRows(rows.filter((row) => row.id !== id));
      // Swal.fire({
      //   title: "Eliminado",
      //   text: "El usuario a sido eliminado",
      //   icon: "success",
      //   timer: 1500,
      //   timerProgressBar: true,
      // });
    }
  };

  const processRowUpdate = async (user: UserType) => {
    if (user.isActive === "Activo") user.isActive = true;
    if (user.isActive === "Inactivo") user.isActive = false;

    let res;
    if (user.isNew) {
      // NUEVO USUARIO ---------------------------------------------------------------------.
      const tempId = user.id as string; // Guardamos el ID temporal
      user.confirmPassword = user.password;
      res = await actionUser(ActionUserEnum.add, user);

      if (res.error) {
        Swal.fire({
          title: res.message,
          icon: "error",
          timer: 6000,
          timerProgressBar: true,
        });
        throw new Error(res.message);
      }

      // Si es exitoso, actualiza el estado
      const newRow = {
        ...res, // Usa los datos del backend
        isNew: false,
      };

      // Actualiza rows REEMPLAZANDO la fila temporal
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === tempId ? newRow : row))
      );

      // Actualiza el modo de edición
      setRowModesModel((prev) => ({
        ...prev,
        [tempId]: { mode: GridRowModes.View }, // Cierra el modo edición
      }));

      return newRow;
    } else {
      // EDITO USUARIO ---------------------------------------------------------------------.
      if (userAuth?.id === user.id) {
        const result = await Swal.fire({
          title: "Estas editando tu propio perfil. ¿Estas seguro?",
          text: "Si edita su perfil debe volver a logearse",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, editar",
          cancelButtonText: "Cancelar",
          focusConfirm: true,
        });
        if (!result.isConfirmed) return;
      }

      if (user.password == "") {
        delete user.password;
        delete user.confirmPassword;
      } else {
        user.confirmPassword = user.password;
      }

      res = await actionUser(ActionUserEnum.edit, user, user.id);

      if (res.error) {
        Swal.fire({
          title: res.message,
          icon: "error",
          timer: 6000,
          timerProgressBar: true,
        });
        throw new Error(res.message);
      }

      if (userAuth?.id === user.id) {
        console.log(userAuth);
        userLogOut();
        navigate("/sign-in");
      }
      const updatedRow = { ...user, isNew: false };
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === user.id ? updatedRow : row))
      );
      return updatedRow;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      //headerAlign: "right",
      //align: "right",
      flex: 1,
      minWidth: 100,
      editable: true,
      preProcessEditCellProps: async (params) => {
        const errorMessage = await validateName({
          id: params.id,
          name: params.props.value.toString(),
        });
        // const value = { ...params.props, error: errorMessage };
        //console.log(value); // obtengo el objeto entero editado, aca tambien veo la propiedad error,
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditData,
    },
    {
      field: "lastname",
      headerName: "Lastname",
      //headerAlign: "right",
      //align: "right",
      flex: 1,
      minWidth: 100,
      editable: true,
      preProcessEditCellProps: async (params) => {
        const errorMessage = await validateLastname({
          id: params.id,
          lastname: params.props.value.toString(),
        });
        // const value = { ...params.props, error: errorMessage };
        //console.log(value); // obtengo el objeto entero editado, aca tambien veo la propiedad error,
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditData,
    },
    {
      field: "email",
      headerName: "Email",
      //headerAlign: "right",
      //align: "right",
      flex: 1,
      minWidth: 120,
      editable: true,
      preProcessEditCellProps: async (params) => {
        const errorMessage = await validateEmail({
          id: params.id,
          email: params.props.value.toString(),
        });
        // const value = { ...params.props, error: errorMessage };
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditData,
    },
    {
      field: "password",
      headerName: "Password",
      //headerAlign: "right",
      //align: "right",
      valueFormatter: () => "********",
      flex: 1,
      minWidth: 100,
      editable: true,
      preProcessEditCellProps: async (params) => {
        const errorMessage = await validatePassword({
          id: params.id,
          password: params.props.value,
        });
        // const value = { ...params.props, error: errorMessage };
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditData,
    },
    {
      field: "roles",
      headerName: "Roles",
      headerClassName: "roles",
      editable: true,
      //headerAlign: "right",
      //align: "right",
      flex: 1,
      minWidth: 100,
      type: "singleSelect",
      valueOptions: valueOptionsRoles,
    },
    {
      field: "isActive",
      headerName: "Status",
      editable: true,
      flex: 1,
      minWidth: 100,
      type: "singleSelect",
      valueOptions: [
        { value: true, label: "Activo" },
        { value: false, label: "Inactivo" },
      ],
      renderCell: (params) => {
        const value = params.value;

        return (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="left"
            sx={{ width: "100%", height: "100%" }}
          >
            {value === true ? (
              <Chip
                icon={
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 22, marginLeft: "4px" }}
                  />
                }
                label="Activo"
                color="success"
                variant="outlined"
                sx={{
                  height: 32,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  "& .MuiChip-icon": {
                    fontSize: 20,
                  },
                }}
              />
            ) : (
              <Chip
                icon={
                  <ErrorRoundedIcon sx={{ fontSize: 22, marginLeft: "4px" }} />
                }
                label="Inactivo"
                color="error"
                variant="outlined"
                sx={{
                  height: 32,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  "& .MuiChip-icon": {
                    fontSize: 20,
                  },
                }}
              />
            )}
          </Stack>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        // En cada vuelta del arreglo agrego el action.
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(String(id))} // String(id) lo tengo que pasar asi porque en el tipado de MUI dice que puede ser un numero
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      //checkboxSelection // Habilita checkboxes para seleccionar filas
      rows={rows}
      columns={columns}
      editMode="row" // habilita la edicion de la fila completa por lo tanto podemos usar el tab para movernos entre las columnas.
      getRowClassName={(
        params // Alterna clases CSS 'even' y 'odd' para filas pares e impares, No esta funcionando
      ) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
      initialState={{
        // Estado inicial de la paginacion
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]} // Valores de la paginacion
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      sx={{
        boxShadow: 2, // Sombreado
        border: 2,
        borderColor: "green",
        "& .MuiDataGrid-cell:hover": {
          // Aplico el color azul cuando este hover
          color: "blue",
        },
        "& .roles": {
          // Nombre de la cabecera .Roles le asigne al background rojo
          color: "red",
        },
      }}
      // disableColumnResize  // Deshabilita poder modificar el ancho de la columna.
      // density="compact" // Deshabilito la densidad compacta para que sea editable.
      //-----------TOOLBAR--------------------------------------------------------------------------------------------
      slots={{
        toolbar: GridToolbarContainer,
      }}
      slotProps={{
        //---------TOOLBAR PROPERTI--------------------------------------------------------------------------------------------
        toolbar: {
          children: (
            <>
              <GridToolbar showQuickFilter={true} />
              <EditToolbar
                setRows={setRows}
                setRowModesModel={setRowModesModel}
              />
            </>
          ),
        },
        //-----------FILTER PANEL--------------------------------------------------------------------------------------------
        // Por defecto en el DataGrid viene el filtro, aca configura los estilos.
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
