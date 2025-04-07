import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from '@mui/material';
import { Card, CardContent, CardActions, Button } from '@mui/material';
import centerElements from './styling/centerStyling';

function DegreeIndividual() {

    const { id } = useParams();
    const [degree, setDegree] = useState({});
    const [cohort, setCohort] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/${id}`)
        .then(response => response.json())
        .then(data => {
            setDegree(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/?degree=${id}`)
        .then(response => response.json())
        .then(data => {
            setCohort(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [id]);

    function degreeRefHandler(degree) {

        return (
            <div>
                <div style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>
                <Typography variant="h4" style={{margin: "auto"}}>Cohorts for {degree.full_name}</Typography>
                <hr />
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body1" >{degree.shortcode}</Typography>
                </div>
            </div>
            </div>
        )
    }

    
    function cohortRefHandler(data) {

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
                        <Button component={Link} to={`/cohorts/${cohort.id}`} size="small">View Cohort</Button>
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
            {degreeRefHandler(degree)}
            <ul>
                {cohortRefHandler(cohort)}
            </ul>
        </div>
    )
    }
}

export default DegreeIndividual;