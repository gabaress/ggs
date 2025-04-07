import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import centerElements from './styling/centerStyling';

function ViewDegrees() {

    const [degrees, setDegrees] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/`)
        .then(response => response.json())
        .then(data => {
            setDegrees(data);
            setIsLoaded(true);
        })
    }, []);

    function degreeRefHandler(degrees) {

        return (
            <div style={{...centerElements}}>
                {degrees.map((degree, index) => (
                    <div key={index} style={{ minWidth: "50vw", padding: "1vw", textAlign: "center"}}>
                        <Card sx={{ minWidth: 275, border: "2.5px solid turquoise", borderRadius: "25px" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {degree.shortcode}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {degree.full_name}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{marginTop: "-2vh", justifyContent: "center"}}>
                                <Button component={Link} to={degree.shortcode} size="small">View Degree</Button>
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
                <h1 style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>All Degrees</h1>
                <ul>
                {degreeRefHandler(degrees)}
                </ul>
            </div>
        )
    }
}

export default ViewDegrees;