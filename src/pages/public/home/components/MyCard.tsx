import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar, // Usaremos Avatar para la imagen redonda (opcional)
} from "@mui/material";
import { Email, Phone, LocationOn, LinkedIn } from "@mui/icons-material";

export default function MyCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%", // Ocupa el 100% del contenedor padre
        //maxWidth: { xs: "100%", sm: 600, md: 800 }, // Adaptable por breakpoint
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        alignItems: "center", // Alinea verticalmente los elementos
        p: 2, // Padding general para separar del borde
      }}
    >
      {/* Imagen redonda con espacio */}
      <Box
        sx={{
          width: 150,
          height: 150,
          minWidth: 150, // Evita que se reduzca
          borderRadius: "50%", // Hace la imagen redonda
          overflow: "hidden",
          border: `0.5px solid ${theme.palette.primary.main}`,
          marginRight: 5, // Espacio entre imagen y datos
          boxShadow: 2, // Sutil sombra para profundidad
        }}
      >
        <Avatar
          src="/MartinPrado.jpg"
          alt="Imagen Martín Prado"
          sx={{
            width: 150,
            height: 150,
            border: `3px solid ${theme.palette.primary.main}`,
            marginRight: 3,
            boxShadow: 2,
          }}
        />
      </Box>

      {/* Contenido */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <CardContent sx={{ p: 1 }}>
          {" "}
          {/* Reducir padding interno si es necesario */}
          {/* Nombre y título */}
          <Typography variant="h5" component="div" fontWeight="bold">
            Martín Fernando Pradooo
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Desarrollador de aplicaciones, stak MERN | Técnico en infraestructura
          </Typography>
          <Divider sx={{ my: 1 }} />
          {/* Datos de contacto */}
          <List dense disablePadding>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <LocationOn fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Guemes 2147, Rosario, Santa Fe, 2000 (AR)"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Email fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItem disableGutters>
                <Link
                  href="mailto:martinprado1000@gmail.com?subject=Contacto%20desde%20portfolio"
                  underline="hover"
                  color="inherit"
                  variant="body2"
                >
                  martinprado1000@gmail.com
                </Link>
              </ListItem>
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Phone fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="341-2725888"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <LinkedIn fontSize="small" color="primary" />
              </ListItemIcon>
              <Link
                href="https://www.linkedin.com/in/mart%C3%ADn-fernando-prado-396a80227/"
                target="_blank"
                underline="hover"
                color="inherit"
                variant="body2"
              >
                LinkedIn
              </Link>
            </ListItem>
          </List>
        </CardContent>
      </Box>
    </Card>
  );
}
