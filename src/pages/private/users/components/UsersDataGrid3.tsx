import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

export default function UsersDataGrid3 () {
  // Datos de ejemplo
  const allData = [
    { id: 1, name: 'User 1', lastname: 'Perez', family: 'Family 1' },
    { id: 2, name: 'User 2', lastname: 'Gomez', family: 'Family 1' },
    { id: 3, name: 'User 3', lastname: 'Lopez', family: 'Family 2' },
    { id: 4, name: 'User 4', lastname: 'Diaz', family: 'Family 2' },
  ];

  // Estado para grupos expandidos
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Family 1': true,
    'Family 2': false
  });

  // Preparar filas ordenadas con grupos primero
  const sortedRows = allData.reduce((acc, row) => {
    // Agregar grupo si no existe
    if (!acc.some(item => item.id === `group-${row.family}`)) {
      acc.push({
        id: `group-${row.family}`,
        family: row.family,
        isGroup: true,
        memberCount: allData.filter(r => r.family === row.family).length
      });
    }
    
    // Agregar miembro si el grupo está expandido
    if (expandedGroups[row.family]) {
      acc.push(row);
    }
    
    return acc;
  }, [] as any[]);

  // Columnas
  const columns: GridColDef[] = [
    {
      field: 'family',
      headerName: 'Family',
      width: 200,
      renderCell: (params) => {
        if (params.row.isGroup) {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedGroups(prev => ({
                    ...prev,
                    [params.row.family]: !prev[params.row.family]
                  }));
                }}
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: 8,
                  fontSize: '1rem'
                }}
              >
                {expandedGroups[params.row.family] ? '▼' : '►'}
              </button>
              <strong>
                {params.row.family} ({params.row.memberCount})
              </strong>
            </div>
          );
        }
        return <div style={{ marginLeft: '32px' }}>{params.row.name}</div>;
      }
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 150,
      renderCell: (params) => params.row.isGroup ? null : params.value
    },
    { 
      field: 'lastname', 
      headerName: 'Lastname', 
      width: 150,
      renderCell: (params) => params.row.isGroup ? null : params.value
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={sortedRows}
        columns={columns}
        getRowId={(row) => row.id}
        hideFooter
        disableColumnMenu
        sx={{
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
          }
        }}
      />
    </div>
  );
};