import { Box, CircularProgress, Typography } from '@mui/material';

export const DashboardLoading = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <CircularProgress 
        size={60}
        thickness={4}
        color="primary"
        sx={{
          //animationDuration: '500ms', // Duracioon de la animación
          '&.MuiCircularProgress-root': {
            marginBottom: '16px'
          }
        }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 500,
          letterSpacing: '0.5px',
          mt: 1
        }}
      >
        Dashboard loading...
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontStyle: 'italic'
        }}
      >
        Please wait while we prepare your dashboard
      </Typography>
    </Box>
  );
};