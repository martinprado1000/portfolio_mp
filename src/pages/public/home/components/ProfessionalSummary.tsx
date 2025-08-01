import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Fade,
  Grow,
  Avatar,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Code, School, Groups } from '@mui/icons-material';

const FloatingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(2, 4, 25, 0.85)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  width: '100%',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '450%',
    height: '1600%',
    background: 'linear-gradient(60deg, rgba(3, 1, 39, 0.97) 0%, rgba(2, 0, 8, 0.71) 100%)',
    transform: 'rotate(30deg)',
    zIndex: -1
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '50px', // Cambiado de width a minWidth para consistencia
  height: '50px',
  borderRadius: '50%',
  marginRight: theme.spacing(2),
  background: theme.palette.mode === 'light' 
    ? 'linear-gradient(135deg, #667eea 0%, #260da0ff 100%)' 
    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  color: 'white',
  flexShrink: 0 // Evita que se reduzca el tamaño
}));

const ProfessionalSummary = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      display: "flex",
      width: "100%",
      margin: "auto",
      borderRadius: 2,
      overflow: "hidden",
      alignItems: "center",
    }}>
      <Fade in={true} timeout={1000}>
        <FloatingCard elevation={3}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                mr: isMobile ? 0 : 3,
                mb: isMobile ? 2 : 0,
                background: 'linear-gradient(135deg, #667eea 0%, #260da0ff 100%)'
              }}
            >
              <Typography variant="h5">YO</Typography>
            </Avatar>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #260da0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              Resumen Personal
            </Typography>
          </Box>
          
          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
          
          <Grow in={true} timeout={1500}>
            <Box>
              {/* Primer elemento */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                mb: 3,
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <IconWrapper sx={{
                  mb: isMobile ? 2 : 0,
                  mx: isMobile ? 'auto' : 0
                }}>
                  <Code fontSize="medium" />
                </IconWrapper>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  minHeight: '50px'
                }}>
                  <Typography variant="body1" sx={{ 
                    mx:2,
                    fontSize: '1.1rem',
                    textAlign: isMobile ? 'center' : 'left'
                  }}>
                    Interesado en el desarrollo de aplicaciones y comprometido con el aprendizaje continuo.
                  </Typography>
                </Box>
              </Box>
              
              {/* Segundo elemento */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                mb: 3,
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <IconWrapper sx={{
                  mb: isMobile ? 2 : 0,
                  mx: isMobile ? 'auto' : 0
                }}>
                  <School fontSize="medium" />
                </IconWrapper>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  minHeight: '50px'
                }}>
                  <Typography variant="body1" sx={{ 
                    mx:2,
                    fontSize: '1.1rem',
                    textAlign: isMobile ? 'center' : 'left'
                  }}>
                    Busco ampliar mis conocimientos y habilidades en el área, mientras colaboro en proyectos diversos.
                  </Typography>
                </Box>
              </Box>
              
              {/* Tercer elemento */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <IconWrapper sx={{
                  mb: isMobile ? 2 : 0,
                  mx: isMobile ? 'auto' : 0
                }}>
                  <Groups fontSize="medium" />
                </IconWrapper>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  minHeight: '50px'
                }}>
                  <Typography variant="body1" sx={{ 
                    mx:2,
                    fontSize: '1.1rem',
                    textAlign: isMobile ? 'center' : 'left'
                  }}>
                    Aprecio la oportunidad de formar parte de equipos colaborativos donde pueda seguir creciendo profesionalmente.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grow>
        </FloatingCard>
      </Fade>
    </Box>
  );
};

export default ProfessionalSummary;