import * as React from "react";
import {
  GridRowModes,
  DataGrid,
  GridEditInputCell,
  GridToolbar,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModesModel,
  GridRenderEditCellParams,
  GridRowEditStopParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { GridColDef } from "@mui/x-data-grid";

//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useUsersContext } from "../../../../contexts/UsersContext";
import {
  ActionUser,
  Roles,
  User,
} from "../../../../contexts/interfaces/users.interfaces";
import {
  validateNameFn,
  validateEmailFn,
  validateLastnameFn,
} from "./ValidationsDataGrid";


// // Tipar las props del EditToolbar
interface EditToolbarProps {
  setRows: React.Dispatch<React.SetStateAction<User[]>>;
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
    setRows((oldRows: User[]) => [
      // oldRows: es el estado actaul de las filas
      // Le asigno los siguientes datos a la nueva fila
      ...oldRows, // Hace una copia de todo el estado actual de las filas
      {
        // Agrega el siguiente fila con los siguientes datos.
        id,
        name: "",
        lastname: "",
        roles: Roles.USER,
        email: "",
        isNew: true,
      },
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

const DataEditInputCell = React.forwardRef<HTMLDivElement, any>(
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

// ****** EXPORT UsersDataGrid ******************************************************************************
export default function UsersDataGrid1() {
  // Obtenemos los usuarios.
  const { actionUser } = useUsersContext();
  const { getUsers, users } = useUsersContext();
  const [rows, setRows] = React.useState<User[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<Record<string, any>>(
    {}
  );

  React.useEffect(() => {
    getUsers();
  }, []);

  // Actualizar rows cuando cambian los usuarios
  React.useEffect(() => {
    if (users) {
      setRows(users);
    }
  }, [users]);

  // const validateName = async (data: ValidationData) => {
  //   const { id, name } = data;
  //   console.log(name)
  //   if (!name) return `El nombre es obligatorio.`;
  //   if (name.length < 2) return `El nombre debe ser mayo a 2 caracteres.`;
  //   // Obtener todos los nombres excepto el del registro actual (si se provee un ID)
  //   const existingNames = rows
  //     .filter((row) => (id ? row.id !== id : true)) // Obtengo todos los usuarios menos el que hay que editar.
  //     .map((row) => row.name?.toLowerCase()); // Obtengo los nombres de los usuarios.
  //   const exists = name ? existingNames.includes(name.toLowerCase()) : false;
  //   return exists ? `El usuario ${name} ya existe.` : null;
  // };

  // const validateLastname = async (data: ValidationData) => {
  //   const { id, name } = data;
  //   console.log(name)
  //   if (!name) return `El nombre es obligatorio.`;
  //   if (name.length < 2) return `El nombre debe ser mayo a 2 caracteres.`;
  //   // Obtener todos los nombres excepto el del registro actual (si se provee un ID)
  //   const existingNames = rows
  //     .filter((row) => (id ? row.id !== id : true)) // Obtengo todos los usuarios menos el que hay que editar.
  //     .map((row) => row.name?.toLowerCase()); // Obtengo los nombres de los usuarios.
  //   const exists = name ? existingNames.includes(name.toLowerCase()) : false;
  //   return exists ? `El usuario ${name} ya existe.` : null;
  // };

  // const validateEmail = async (data: ValidationData) => {
  //   const { id, email } = data;
  //   // Obtener todos los nombres excepto el del registro actual (si se provee un ID)
  //   const existingNames = rows
  //     .filter((row) => (id ? row.id !== id : true)) // Obtengo todos los usuarios menos el que hay que editar.
  //     .map((row) => row.email?.toLowerCase()); // Obtengo los emails de los usuarios.
  //   const exists = email ? existingNames.includes(email.toLowerCase()) : false;
  //   return exists ? `El email ${email} ya existe.` : null;
  // };

  const validateName = validateNameFn(rows);
  const validateLastname = validateLastnameFn(rows);
  const validateEmail = validateEmailFn(rows);

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
  // const handleDeleteClick = (id: string | number) => () => {
  //   console.log("Elimino el dato con id:", id);
  //   setRows(rows.filter((row) => row.id !== id));
  // };
  // const processRowUpdate = (newRow: User) => {
  //   if (newRow.isNew) {
  //     // Aquí puedes manejar lo que quieras hacer cuando se agrega una fila nueva
  //     console.log("Nuevo dato:", newRow);
  //   } else {
  //     // Aquí puedes manejar lo que quieras hacer cuando se edita una fila existente
  //     console.log("Actualizar dato:", newRow);
  //   }
  //   const updatedRow = { ...newRow, isNew: false };
  //   setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  //   return updatedRow;
  // };

  // Elimino usuario.
  const handleDeleteClick = (id: string | number) => () => {
    console.log("Elimino el dato con id:", id);
    setRows(rows.filter((row) => row.id !== id));
  };
  // Creo o edito usuario
  const processRowUpdate = async (user: User) => {
    console.log(user.isNew);
    let res;
    if (user.isNew) {
      // CREO USUARIO
      console.log("Nuevo dato:", user);
      user.id = undefined;
      res = await actionUser(ActionUser.add, user);
    } else {
      // EDITO USUARIO
      console.log("Actualizar dato:", user);
      if (user.password == "" && user.confirmPassword == "") {
        // Si no envian ningun password elimino las propiedades password y password repeat para que no las envia al backend como un string vacio.
        delete user.password;
        delete user.confirmPassword;
      }
      res = await actionUser(ActionUser.edit, user, user.id);
      console.log(res);
    }
    console.log(res);
    // SI LA CONSULTA NO ES EXITOSA
    if (res.error) {
      Swal.fire({
        title: res.message,
        icon: "warning",
        timer: 3000,
        timerProgressBar: true,
      });
      getUsers();
    }
    const updatedRow = { ...user, isNew: false };
    setRows(rows.map((row) => (row.id === user.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      //headerAlign: "right",
      //align: "right",
      flex: 1,
      minWidth: 80,
      editable: true,
      preProcessEditCellProps: async (params) => {
        const errorMessage = await validateName({
          id: params.id,
          name: params.props.value.toString(),
        });
        const value = { ...params.props, error: errorMessage };
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
        const value = { ...params.props, error: errorMessage };
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
        const value = { ...params.props, error: errorMessage };
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
      valueOptions: [Roles.SUPERADMIN, Roles.ADMIN, Roles.OPERATOR, Roles.USER],
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
            onClick={handleDeleteClick(id)}
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
