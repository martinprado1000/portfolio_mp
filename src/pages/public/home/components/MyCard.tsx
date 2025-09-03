import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GetApp,
} from "@mui/icons-material"; 

const PUBLIC_URL: string = import.meta.env.VITE_PUBLIC_URL;

const downloadPDF = () => {
  const pdfUrl = `${PUBLIC_URL}/Martin_Prado_CV.pdf`;
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.setAttribute('download', 'Martin_Prado_CV.pdf'); 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function MyCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
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
          marginRight: isMobile ? 0 : 5,
          marginBottom: isMobile ? 2 : 0,
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
            marginRight: isMobile ? 0 : 3,
            boxShadow: 2,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: isMobile ? "100%" : "auto",
        }}
      >
        <CardContent sx={{ p: 1 }}>
          <Typography variant="h5" component="div" fontWeight="bold" align={isMobile ? "center" : "left"}>
            Martín Fernando Prado
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            gutterBottom
            align={isMobile ? "center" : "left"}
          >
            Desarrollador de aplicaciones, stak MERN | Técnico en infraestructura
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
                href="https://wa.me/+5493412725888"
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
    </Card>
  );
}