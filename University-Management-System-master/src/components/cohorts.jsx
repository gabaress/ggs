import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import centerElements from './styling/centerStyling';

function ViewCohorts() {

    const [cohorts, setCohorts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cohort/')
            .then(response => response.json())
            .then(data => {
                setCohorts(data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);

    function refHandler(data) {

        return (
            <div style={centerElements}>
            {data.map((cohort, index) => (
                <div key={index} style={{ minWidth: "45%", padding: "1vw"}}>
                    <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        ID: {cohort.id}
                        </Typography>
                        <Typography variant="h5" component="div">
                        {cohort.name}
                        </Typography>
                        <Typography sx={{ mb: -2 }} color="text.secondary">
                        Year: {cohort.year}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={cohort.id} size="small">View Cohort</Button>
                    </CardActions>
                    </Card>
                    <br></br>
                </div>
            ))}
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
               <img alt="Loading" src={`${process.env.PUBLIC_URL}/loadingCat.gif`}></img>
            </div>
        );
    }
    else {
        return (
            <div>
                <h1 style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>All Cohorts</h1>
                <ul>
                    {refHandler(cohorts)}
                </ul>
            </div>
        );
    }
}

export default ViewCohorts;