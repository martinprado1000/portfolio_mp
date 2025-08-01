import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  useTheme,
  Zoom,
  Tooltip 
} from '@mui/material';
import { FaNodeJs, FaReact, FaBootstrap, FaGit, FaDocker } from "react-icons/fa6";
import { SiJavascript, SiMongodb, SiMui, SiMysql, SiPhp, SiNestjs } from "react-icons/si";

const skills = [
  { icon: <SiJavascript size={24} />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <SiNestjs size={24} />, name: 'Nest.js', color: '#E0234E' },
  { icon: <FaNodeJs size={24} />, name: 'Node.js', color: '#68A063' },
  { icon: <FaReact size={24} />, name: 'React', color: '#61DAFB' },
  { icon: <SiMongodb size={24} />, name: 'MongoDB', color: '#47A248' },
  { icon: <SiMui size={24} />, name: 'Material-UI', color: '#007FFF' },
  { icon: <FaBootstrap size={24} />, name: 'Bootstrap', color: '#7952B3' },
  { icon: <FaGit size={24} />, name: 'Git', color: '#F05032' },
  { icon: <FaDocker size={24} />, name: 'Docker', color: '#2496ED' },
  { icon: <SiMysql size={24} />, name: 'MySQL', color: '#4479A1' },
  { icon: <SiPhp size={24} />, name: 'PHP', color: '#777BB4' },
];

const SkillsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
    //   maxWidth: 800, 
      mx: 'auto', 
      p: 3,
      textAlign: 'center'
    }}>
      <Typography 
        variant="h6" 
        color="primary" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          mb: 4,
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            width: '50px',
            height: '3px',
            backgroundColor: theme.palette.primary.main,
            margin: '10px auto 0'
          }
        }}
      >
        Aptitudes
      </Typography>

      <Grid container spacing={2}>
        {skills.map((skill, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Zoom in style={{ transitionDelay: `${index * 50}ms` }}>
              <Tooltip title={skill.name} arrow>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    width: '100%',
                    minHeight: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3,
                      '& .skill-text': {
                        color: skill.color,
                        fontWeight: 600,
                      },
                      '& .skill-icon': {
                        transform: 'scale(1.1)',
                      }
                    }
                  }}
                >
                  <Box 
                    className="skill-icon"
                    sx={{ 
                      color: skill.color,
                      fontSize: '2.5rem',
                      mb: 1,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {skill.icon}
                  </Box>
                  <Typography 
                    className="skill-text"
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {skill.name}
                  </Typography>
                </Paper>
              </Tooltip>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsSection;