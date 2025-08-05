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
  Avatar,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GetApp,
} from "@mui/icons-material";

import { jsPDF } from "jspdf";

const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Martín Fernando Prado", 10, 20);
  doc.setFontSize(14);
  doc.text(
    "Desarrollador de aplicaciones, stack MERN | Técnico en infraestructura",
    10,
    30
  );

  doc.setFontSize(12);
  doc.text("Dirección: Guemes 2147, Rosario, Santa Fe, 2000 (AR)", 10, 45);
  doc.text("Email: martinprado1000@gmail.com", 10, 55);
  doc.text("Teléfono: +54 341 2725888", 10, 65);
  doc.text("LinkedIn: www.linkedin.com/in/martín-fernando-prado", 10, 75);
  doc.text("Mi portfolio: www.portfolio-mp.onrender.com", 10, 85);

  doc.save("Martin_Prado_Contacto.pdf");
};

export default function MyCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: 150,
          height: 150,
          minWidth: 150,
          borderRadius: "50%",
          overflow: "hidden",
          border: `0.5px solid ${theme.palette.primary.main}`,
          marginRight: 5,
          boxShadow: 2,
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <CardContent sx={{ p: 1 }}>
          <Typography variant="h5" component="div" fontWeight="bold">
            Martín Fernando Prado
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Desarrollador de aplicaciones, stak MERN | Técnico en
            infraestructura
          </Typography>
          <Divider sx={{ my: 1 }} />
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
              <Link
                href="https://wa.me/+5493412725888" // Reemplaza con tu número completo incluyendo código de país
                target="_blank"
                underline="hover"
                color="inherit"
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                341-2725888
              </Link>
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <LinkedIn fontSize="small" color="primary" />
              </ListItemIcon>
              <Link
                href="www.linkedin.com/in/martín-fernando-prado"
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

        <Divider />

        <CardContent>
          <List dense disablePadding>
            <ListItem
              disableGutters
              button
              onClick={downloadPDF}
              sx={{
                "&:hover": {
                  cursor: 'pointer',
                  backgroundColor: "action.hover",
                  borderRadius: 1,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <GetApp fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Descargar información."
              />
            </ListItem>
          </List>
        </CardContent>
      </Box>

      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <CardContent sx={{ p: 1 }}>

          <List dense disablePadding>
            <ListItem 
              disableGutters
              button
              onClick={downloadPDF}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderRadius: 1
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <GetApp fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Descargar información."
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Box> */}
    </Card>
  );
}
