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
import { HistorialDeEmpleos } from "./HistorialDeEmpleos";
import Education from "./Education";
import { Aplicactions } from "./Aplications";
import ProfessionalSummary from "./ProfessionalSummary";

// const cardData = [
//   {
//     img: "https://picsum.photos/800/450?random=1",
//     tag: "Engineering",
//     title: "Revolutionizing software development with cutting-edge tools",
//     description:
//       "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
//     authors: [
//       { name: "Remy Sharp", avatar: "/static/images/avatar/1.jpg" },
//       { name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" },
//     ],
//   },
//   {
//     img: "https://picsum.photos/800/450?random=2",
//     tag: "Product",
//     title: "Innovative product features that drive success",
//     description:
//       "Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.",
//     authors: [{ name: "Erica Johns", avatar: "/static/images/avatar/6.jpg" }],
//   },
//   {
//     img: "https://picsum.photos/800/450?random=3",
//     tag: "Design",
//     title: "Designing for the future: trends and insights",
//     description:
//       "Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.",
//     authors: [{ name: "Kate Morrison", avatar: "/static/images/avatar/7.jpg" }],
//   },
//   {
//     img: "https://picsum.photos/800/450?random=4",
//     tag: "Company",
//     title: "Our company's journey: milestones and achievements",
//     description:
//       "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
//     authors: [{ name: "Cindy Baker", avatar: "/static/images/avatar/3.jpg" }],
//   },
//   {
//     img: "https://picsum.photos/800/450?random=45",
//     tag: "Engineering",
//     title: "Pioneering sustainable engineering solutions",
//     description:
//       "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
//     authors: [
//       { name: "Agnes Walker", avatar: "/static/images/avatar/4.jpg" },
//       { name: "Trevor Henderson", avatar: "/static/images/avatar/5.jpg" },
//     ],
//   },
//   {
//     img: "https://picsum.photos/800/450?random=6",
//     tag: "Product",
//     title: "Maximizing efficiency with our latest product updates",
//     description:
//       "Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.",
//     authors: [{ name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" }],
//   },
// ];

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
  whiteSpace: "pre-line", // Respeta saltos de línea
  wordBreak: "break-word",
});

export default function MainContent() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box id="datos-personales">
        <MyCard />
      </Box>
      <Box id="aptitudes">
        <Aptitudes />
      </Box>
      <Box id="ResumenPersonal">
        <ProfessionalSummary />
      </Box>
      <Box id="educacion">
        <Education />
      </Box>
      <Box id="historial-empleos">
        <HistorialDeEmpleos />
      </Box>
      <Box id="aplicaciones">
        <Aplicactions />
      </Box>
    </Box>
  );
}
