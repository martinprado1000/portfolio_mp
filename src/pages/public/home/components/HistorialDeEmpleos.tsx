import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import MyCard from "./MyCard";
import Aptitudes from "./Aptitudes";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 20,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "pre-line",
  wordBreak: "break-word",
});

export function HistorialDeEmpleos() {

  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  return (
    <>
      <div>
        <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>
          Historial de empleos.
        </Typography>
      </div>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            tabIndex={0}
            className={focusedCardIndex === 2 ? "Mui-focused" : ""}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              alt="Toolsoft"
              image={"./Toolsoft.PNG"}
              sx={{
                height: 200,
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                width: "100%",
                p: 1,
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                Rosario, Santa Fe | Mayo 2016 - Presente
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Toolsoft SRL
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                Técnico en soporte informático de primer y segundo nivel en
                infraestructura. Windows, Linux, VMWare, CCTV, telefonía
                analógica e IP, networking, Mikrotik. Encargado del análisis,
                desarrollo e implementación de proyectos de infraestructura.
                Leer manuales técnicos, consultar con los usuarios o realizar
                diagnósticos informáticos para investigar y resolver problemas o
                para proporcionar asistencia técnica y soporte.
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            tabIndex={0}
            className={focusedCardIndex === 2 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CardMedia
              component="img"
              alt="Wisetek"
              image={"w.PNG"}
              sx={{
                height: 200,
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                width: "100%",
                p: 1,
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                Rosario, Santa Fe | Ene. 2014 - Ene. 2016
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Wisetek SRL
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                Trabajo de forma Autónoma. Técnico en trabajos de
                infraestructura, domótico, inmótica, CCTV, seguridad
                electrónica, control de acceso, detección de incendio y de
                intrusión, cableado estructurado. Diseño y desarrollo de casas
                inteligentes.
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            tabIndex={0}
            className={focusedCardIndex === 5 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CardMedia
              component="img"
              alt="IBM"
              image={"IBM.PNG"}
              sx={{
                height: 200,
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                width: "100%",
                p: 1,
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                Buenos Aires, Capital Federal | Jun. 2006 - Ene. 2014
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                IBM Argentina
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                Técnico especialista en ATM (Cajeros Automáticos y
                Autoservicios) Reparación a nivel HW (reparaciones internas como
                cambios de ingeniería de los equipos). Configuraciones,
                masterizaciones y programación a nivel SW. Cursos oficiales
                provistos por IBM, estando certificado en las 3 marcas más
                importantes de ATM a nivel mundial (Diebold, NCR y Wincor). Por
                medio de IBM he trabajado en directa con las empresas BANELCO y
                LINK en el área de telecomunicaciones y redes (TCP IP y X25.)
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
      </Grid>
    </>
  );
}
