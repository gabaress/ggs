import { Card, CardActionArea, CardContent, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import centerElements from './styling/centerStyling';

function LandingPage() {
    
    const cardData = [
      { link: '/degrees', title: 'Degrees', description: 'View all degrees' },
      { link: '/cohorts', title: 'Cohorts', description: 'Manage cohorts' },
      { link: '/modules', title: 'Modules', description: 'Explore modules' },
      { link: '/students', title: 'Students', description: 'Student information' },
      { link: '/create-degree', title: 'Create Degree', description: 'Add a new degree' },
      { link: '/create-cohort', title: 'Create Cohort', description: 'Create a new cohort' },
      { link: '/create-module', title: 'Create Module', description: 'Enter a new module' },
      { link: '/create-student', title: 'Create Student', description: 'Register a new student' },
    ];

    const CardButton = ({ link, title, description }) => {
        const navigate = useNavigate();
      
        const handleClick = () => {
          navigate(link);
        };
      
        return (
          <Card sx={{ maxWidth: 345, border: '4px solid turquoise', borderRadius: '25px' }}>
            <CardActionArea onClick={handleClick}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
    };
  
    return (
        <div style={centerElements}>
        <Box sx={{marginTop: "20vh", maxWidth: "35vw"}}>
            <Typography variant="h4" gutterBottom component="div" textAlign="center">
                Welcome to UniSys
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div" textAlign="center" style={{marginBottom: "2vh"}}>
                Please choose an option below to proceed.
            </Typography>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {cardData.map((card, index) => (
                    <Grid item key={index}>
                        <CardButton link={card.link} title={card.title} description={card.description} />
                    </Grid>
                ))}
            </Grid>
        </Box>
        </div>
    );
  };
  
export default LandingPage;