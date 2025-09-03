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
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import { Button, Divider } from "@mui/material";
import {
  VisibilityOutlined,
  FavoriteBorder,
  ShareOutlined,
} from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public"; // Icono de página web
import MenuBookIcon from "@mui/icons-material/MenuBook"; // Icono de librito
import GitHubIcon from "@mui/icons-material/GitHub"; // Icono de GitHub

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
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
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Engineering",
    title: "Revolutionizing software development with cutting-edge tools",
    description:
      "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
    authors: [
      { name: "Remy Sharp", avatar: "/static/images/avatar/1.jpg" },
      { name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Engineering",
    title: "Revolutionizing software development with cutting-edge tools",
    description:
      "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
    authors: [
      { name: "Remy Sharp", avatar: "/static/images/avatar/1.jpg" },
      { name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
];

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
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
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

export function Aplicactions() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({
    title: "",
    content: "",
    clarification: "",
    important: "",
  });

  const handleOpenModal = (
    title: string,
    content: string,
    clarification: string,
    important: string
  ) => {
    setModalContent({ title, content, clarification, important });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div>
        <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>
          Mis aplicaciones.
        </Typography>
      </div>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={"./transactionsV2.PNG"}
              aspect-ratio="16 / 9"
              sx={{
                height: 200,
                objectFit: "contain",
                backgroundColor: "black",
                width: "100%",
                p: 1,
                //borderBottom: "1px solid #f0f0f0"
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="h3" component="div">
                Transactions API
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Desarrollado con Nest y React
              </Typography>
              {/* <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {cardData[1].description}
              </StyledTypography> */}
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<MenuBookIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                }}
                onClick={() =>
                  handleOpenModal(
                    "Transacciones API",
                    "El backed esta desarrollado en Nest.js. Tecnologias usadas en el bachend: Nest.js, mongoose, jsonwebtoken, nodemailer, passport, passport-jwt, class-validator.El frontend esta desarrollado en React-Vite. Página responsive.Tecnologias usadas en el frontend: Vite, react-materialUI, react-router-dom, react-hook-form, sweetalert2.",
                    "PODES PROBAR LA APLICACION haciendo click en el icono website, registrate y listo. Si lo queres probar como usuario superAdministrador (Podras crear, editar y eliminar usuarios y transacciones) logueate con las siguientes credenciales, Usuario: admin@google.com Password: Test123*",
                    "¡IMPORTANTE! La aplicación está alojada en un hosting gratuito, por lo tanto, está suspendida y demora aproximadamente 1 minuto en traer el primer dato o ejecutar la primera consulta."
                  )
                }
              >
                Documentación:
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                  color: "text.primary",
                }}
                component="a"
                href="https://github.com/martinprado1000/proyecto-03-transactions-backend" // Reemplaza con tu URL
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fuente
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<PublicIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                }}
                component="a"
                href="https://proyecto-03-transactions-frontend.onrender.com/" // Reemplaza con tu URL
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver sitio web
              </Button>
            </Box>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="Ecommerce"
              image={"./Ecommerce.PNG"}
              sx={{
                height: 200,
                objectFit: "contain",
                backgroundColor: "black",
                width: "100%",
                p: 1,
                //borderBottom: "1px solid #f0f0f0"
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="h3" component="div">
                Ecommerce API
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Desarrollado con Node y React.
              </Typography>
              {/* <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {cardData[0].description}
              </StyledTypography> */}
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<MenuBookIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                }}
                onClick={() =>
                  handleOpenModal(
                    "Ecommerce API",
                    "El backed esta desarrollado en Node.js. Tecnologias usadas en el bachend: Express, mongoose, connect-mongo, dotenv, cookie-parser, jsonwebtoken, nodemailer, passport, passport-jwt, express-validator.El frontend esta desarrollado en React. Página responsive.Tecnologias usadas en el frontend: Vite, react-bootstrap, react-router-dom, react-hook-form, js-cookie, sweetalert2.",
                    "PODES PROBAR LA APLICACION haciendo click en el icono website, registrate y listo. Si lo queres probar como usuario superAdministrador (Podras crear, editar y eliminar usuarios y productos) logueate con las siguientes credenciales, Usuario: superadmin@superadmin.com Password: 123456",
                    "¡IMPORTANTE! La aplicación está alojada en un hosting gratuito, por lo tanto, está suspendida y demora aproximadamente 1 minuto en traer el primer dato o ejecutar la primera consulta."
                  )
                }
              >
                Documentación
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                  color: "text.primary",
                }}
                component="a"
                href="https://github.com/martinprado1000/02_API-React_Node-Ecommers.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fuente
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<PublicIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                }}
                component="a"
                href="https://zero2-api-react-node-ecommers-front.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver sitio web
              </Button>
            </Box>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="Ecommerce SSR"
              image={"./Ecommerce_SSR.PNG"}
              aspect-ratio="16 / 9"
              sx={{
                height: 200,
                objectFit: "contain",
                backgroundColor: "black",
                width: "100%",
                p: 1,
                //borderBottom: "1px solid #f0f0f0"
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="h3" component="div">
                Ecommerce SSR
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Ecommer desarrollado con Node y renderizado con handlebars.
              </Typography>
              {/* <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {cardData[0].description}
              </StyledTypography> */}
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<MenuBookIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                }}
                onClick={() =>
                  handleOpenModal(
                    "Ecommerce SSR (Server side rendering)",
                    "Aplicación desarrollado con Node.js. Frontend renderizado desde el backend con plantillas Handlebars Tecnologias usadas: Express, express-handlebars, express-session, mongoose, connect-mongo, dotenv, cookie-parser, nodemailer, passport, passport-local, passport-github2, connect-flash.",
                    "PODES PROBAR LA APLICACION haciendo click en el icono website, registrate y listo. Si lo queres probar como usuario superAdministrador (Podras crear, editar y eliminar usuarios y productos) logueate con las siguientes credenciales, Usuario: superadmin@superadmin.com Password: 123456",
                    "¡IMPORTANTE! La aplicación está alojada en un hosting gratuito, por lo tanto, está suspendida y demora aproximadamente 1 minuto en traer el primer dato o ejecutar la primera consulta."
                  )
                }
              >
                Documentación
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                  color: "text.primary",
                }}
                component="a"
                href="https://github.com/martinprado1000/Desafio_final.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fuente
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<PublicIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                }}
                component="a"
                href="https://ecommerce-ssr.onrender.com/realTimeProducts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver sitio web
              </Button>
            </Box>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="Chat"
              image={"./Chat.PNG"}
              sx={{
                height: 200,
                objectFit: "contain",
                backgroundColor: "black",
                width: "100%",
                p: 1,
                //borderBottom: "1px solid #f0f0f0"
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="h3" component="div">
                Chat API
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Desarrollado con Node y React.
              </Typography>
              {/* <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {cardData[0].description}
              </StyledTypography> */}
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<MenuBookIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                }}
                onClick={() =>
                  handleOpenModal(
                    "Chat API",
                    "El backed esta desarrollado en Node.js. Tecnologias usadas en el bachend: Express, socket.io, mongoose, connect-mongo, dotenv, cookie-parser, jsonwebtoken, nodemailer, passport, passport-jwt, express-validator. El frontend esta desarrollado en React. Página responsive. Tecnologias usadas en el frontend: Vite, react-bootstrap, socket.io-client, react-router-dom, react-hook-form, js-cookie, sweetalert2.",
                    "PODES PROBAR LA APLICACION haciendo click en el icono website, registrate y listo. Si lo queres probar como usuario superAdministrador (Podras crear, editar y eliminar usuarios) logueate con Usuario: superadmin@superadmin.com Password: 123456",
                    "¡IMPORTANTE! La aplicación está alojada en un hosting gratuito, por lo tanto, está suspendida y demora aproximadamente 1 minuto en traer el primer dato o ejecutar la primera consulta."
                  )
                }
              >
                Documentación
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                  color: "text.primary",
                }}
                component="a"
                href="https://github.com/martinprado1000/03_API-React_Node-Chat.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fuente
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<PublicIcon />}
                sx={{
                  textTransform: "none",
                  py: 1,
                  justifyContent: "flex-start",
                }}
                component="a"
                href="https://zero3-api-react-node-chat-front.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver sitio web
              </Button>
            </Box>
          </SyledCard>
        </Grid>
      </Grid>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="documentation-modal"
        aria-describedby="documentation-content"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            {modalContent.title}
          </Typography>
          <Typography variant="body1">{modalContent.content}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" gutterBottom>
            {modalContent.clarification}
          </Typography>
          <Typography variant="body1" color="primary">
            {modalContent.important}
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
