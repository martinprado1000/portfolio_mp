import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridEditInputCell,
  GridToolbar,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const roles = ["superAdmin", "admin", "operator", "supervisor"];
const randomRole = () => {
  return roles[Math.floor(Math.random() * roles.length)];
};

const randomId = () => Math.floor(Math.random() * 10000);
// const randomCreatedDate = () =>
//   new Date(Date.now() - Math.floor(Math.random() * 10000000000));

const initialRows = [
  {
    id: 111,
    name: "Martin",
    age: 25,
    joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    role: "admin",
  },
  {
    id: 222,
    name: "Juan",
    age: 99,
    joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    role: "admin",
  },
  {
    id: 221,
    name: "Dario",
    age: 99,
    joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    role: "admin",
  },
  {
    id: 223,
    name: "Pedro",
    age: 99,
    joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    role: "admin",
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const handleClick = () => {
    const id = randomId();
    console.log(oldRows)
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "",
        age: "",
        joinDate: new Date(Date.now()),
        role: randomRole(),
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
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

//------------------------------------------------------------------------
const StyledBox = styled("div")(({ theme }) => ({
  height: 400,
  width: "100%",
  "& .MuiDataGrid-cell--editable": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#376331" : "rgb(217 243 190)",
    "& .MuiInputBase-root": {
      height: "100%",
    },
  },
  "& .Mui-error": {
    backgroundColor: `rgb(126,10,15, ${
      theme.palette.mode === "dark" ? 0 : 0.1
    })`,
    color: theme.palette.mode === "dark" ? "#ff4343" : "#750f0f",
  },
}));

let promiseTimeout;
function validateName(username) {
  console.log(username)
  console.log(initialRows)
  const existingUsers = initialRows.map((row) => row.name.toLowerCase());
  // console.log("Cada dato que se modifica pasa por aca");
  return new Promise((resolve) => {
    promiseTimeout = setTimeout(() => {
      const exists = existingUsers.includes(username.toLowerCase());
      resolve(exists ? `Este usuario ${username} ya existe.` : null);
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

function validateAge(age) {
  console.log(age);
  if (age < 18) {
    return `No puede ser menor de 18.`;
  } else {
    return null;
  }
}

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function NameEditInputCell(props) {
  const { error } = props;
  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}

function AgeEditInputCell(props) {
  const { error } = props;
  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}

function renderEditName(params) {
  return <NameEditInputCell {...params} />;
}

function renderEditAge(params) {
  return <AgeEditInputCell {...params} />;
}
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------

function UsersDataGrid2() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  // const preProcessEditCellProps = async (params) => {
  //   console.log(params)
  //   let errorMessage = await validateName(params.props.value.toString());
  //   const value = { ...params.props, error: errorMessage }
  //   console.log(value)  // obtengo el objeto entero editado, aca tambien veo la propiedad error,
  //   return { ...params.props, error: errorMessage };
  // };

  //   const preProcessEditCellProps = async (params) => {
  //   console.log(params)
  //   let errorMessage = await validateName(params.props.value.toString());
  //   const value = { ...params.props, error: errorMessage }
  //   console.log(value)  // obtengo el objeto entero editado, aca tambien veo la propiedad error,
  //   return { ...params.props, error: errorMessage };
  // };

  // const preProcessEditCellProps = async (params) => {
  //   console.log(params)
  //   let errorMessage;
  //   if (params.field === 'name') {
  //     errorMessage = await validateName(params.props.value.toString());
  //   } else if (params.field === 'age') {
  //     errorMessage = await validateAge(params.props.value);
  //   }
  //   const value = { ...params.props, error: errorMessage };
  //   console.log(value)  // obtengo el objeto entero editado, aca tambien veo la propiedad error,
  //   return { ...params.props, error: errorMessage };
  // };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleDeleteClick = (id) => () => {
    console.log("Elimino el dato con iddddd:", id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    if (newRow.isNew) {
      // Aquí puedes manejar lo que quieras hacer cuando se agrega una fila nueva
      console.log("Nuevo dato:", newRow);
    } else {
      // Aquí puedes manejar lo que quieras hacer cuando se edita una fila existente
      console.log("Actualizar dato:", newRow);
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
      preProcessEditCellProps: async (params) => {
        console.log(params);
        const errorMessage = await validateName(params.props.value.toString());
        const value = { ...params.props, error: errorMessage };
        console.log(value); // obtengo el objeto entero editado, aca tambien veo la propiedad error,
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditName,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
      cellClassName: "age-column-cell",
      preProcessEditCellProps: (params) => {
        console.log(params);
        const errorMessage = validateAge(params.props.value);
        const value = { ...params.props, error: errorMessage };
        console.log(value);
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditAge,
    },
    {
      field: "joinDate",
      headerName: "Join date",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "role",
      headerClassName: "Department", // Le asigno un nombre al header para poder editar en el grid
      headerName: "Department",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["superAdmin", "admin", "operator", "supervisor"],
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
    <Box
      sx={{
        height: 400, // Alto de la tabla
        //width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        // "& .age-column-cell": {     // Color de la celda age
        //   backgroundColor: "green",
        // },
        "& .MuiDataGrid-row:nth-of-type(odd)": {
          // Aplica el estilo a las filas impares. Para intercalar el color de las filas
          backgroundColor: "grey.200",
        },
        "& .MuiDataGrid-row:nth-of-type(even)": {
          // Aplica el estilo a las filas pares.  Para intercalar el color de las filas
          backgroundColor: "grey.400",
        },
      }}
    >
      <DataGrid
        rows={rows}
        rowHeight={20} // Alto de las filas
        columns={columns}
        editMode="row"
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
          '& .Department': {        // Nombre de la cabecera .Deparmennt le asigne al background rojo
            backgroundColor: 'red',
          },
        }}
        slots={{
          toolbar: GridToolbarContainer,
        }}
        slotProps={{
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
        }}
      />
    </Box>
  );
}

export default UsersDataGrid2;
