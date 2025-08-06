import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { FaNodeJs, FaReact } from "react-icons/fa6";
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiNestjs,
} from "react-icons/si";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { SiReactrouter } from "react-icons/si";
import { Typography } from "@mui/material";

const info = [
  {
    date: "Julio. 2025",
    title: "DevTalles",
    description: "React Router: Navegación declarativa y framework",
    image: [
      {
        icon: <SiReactrouter size={24} />,
        name: "ReactRouter.js",
        color: "#CA4245",
      },
      {
        icon: <SiTypescript size={24} />,
        name: "TypeScrip",
        color: "#3178C6",
      },
      {
        icon: <SiJavascript size={24} />,
        name: "JavaScript.js",
        color: "#F7DF1E",
      },
    ],
    certificate: "/cert_react_router.PNG",
  },
  {
    date: "Abril. 2025",
    title: "DevTalles",
    description: "Nest: Desarrollo backend escalable con Node",
    image: [
      { icon: <SiNestjs size={24} />, name: "Nest.js", color: "#E0234E" },
      {
        icon: <SiMongodb size={24} />,
        name: "Mongodb",
        color: "#47A248",
      },
      {
        icon: <SiTypescript size={24} />,
        name: "TypeScrip",
        color: "#3178C6",
      },
    ],
    certificate: "/cert_nest.PNG",
  },
  {
    date: "Diciembre. 2023",
    title: "Coderhouse",
    description: "Programador Backend, Node.js.",
    image: [
      { icon: <FaNodeJs size={24} />, name: "Node.js", color: "#68A063" },
      {
        icon: <SiJavascript size={24} />,
        name: "JavaScript.js",
        color: "#F7DF1E",
      },
      {
        icon: <SiMongodb size={24} />,
        name: "Mongodb",
        color: "#47A248",
      },
    ],
    certificate: "/cert_node.png",
  },
  {
    date: "Agosto 2024",
    title: "Coderhouse",
    description: "Programador Frontend, React.js.",
    image: [
      { icon: <FaReact size={24} />, name: "React.js", color: "#61DAFB" },
      {
        icon: <SiJavascript size={24} />,
        name: "JavaScript.js",
        color: "#F7DF1E",
      },
      {
        icon: <SiTypescript size={24} />,
        name: "TypeScrip",
        color: "#3178C6",
      },
    ],
    certificate: "/cert_react.png",
  },
  {
    date: "Noviembre 2016",
    title: "Terciario Urquiza, Rosario, Santa Fe",
    description: "Analista en sistemas",
    image: [
      { icon: <SiPhp size={24} />, name: "Php", color: "#777BB4" },
      { icon: <SiMysql size={24} />, name: "MySQL", color: "#4479A1" },
      {
        icon: <SiJavascript size={24} />,
        name: "JavaScript.js",
        color: "#F7DF1E",
      },
    ],
  },
  {
    date: "Noviembre 2004",
    title: "Escuela Técnica N° 19 - D.E: 1° “Alejandro Volta” , Buenos Aires.",
    description: "Técnico electrónico",
    image: [
      {
        icon: <ElectricBoltIcon size={24} />,
        name: "Electrónica",
        color: "#1724d8ff",
      },
    ],
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
  maxWidth: "90%",
  maxHeight: "90%",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },
  "& .arrow": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
}));

function Information({ image, date }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {image.map((image, index) => (
            <Avatar
              key={index}
              alt={image.name}
              sx={{ width: 40, height: 40, color: image.color }}
            >
              {image.icon}
            </Avatar>
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {image.map((img) => img.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">{date}</Typography>
    </Box>
  );
}

export default function Education() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );
  const [openModal, setOpenModal] = React.useState(false);
  const [currentCertificate, setCurrentCertificate] = React.useState("");

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleOpenModal = (certificateUrl: string) => {
    setCurrentCertificate(certificateUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>
        Educación.
      </Typography>

      <Grid container spacing={6} columns={12} sx={{ my: 2 }}>
        {info.map((lenguage, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6 }}
            sx={{
              border: "1px solid #383737ff", // Borde gris claro
              borderRadius: "8px", // Esquinas redondeadas
              p: 2, // Padding interno para que no pegue el contenido al borde
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 1,
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TitleTypography
                  gutterBottom
                  variant="h6"
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === index ? "Mui-focused" : ""}
                >
                  {lenguage.title}
                  <NavigateNextRoundedIcon
                    className="arrow"
                    sx={{ fontSize: "1rem" }}
                  />
                </TitleTypography>
                {lenguage.certificate && (
                  <IconButton
                    onClick={() => handleOpenModal(lenguage.certificate)}
                    sx={{ color: "primary.main" }}
                    aria-label="Ver certificado"
                  >
                    <WorkspacePremiumIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {lenguage.description}
              </StyledTypography>

              <Information image={lenguage.image} date={lenguage.date} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="certificate-modal"
        aria-describedby="certificate-image"
      >
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={currentCertificate}
            alt="Certificado"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Modal>
    </div>
  );
}
