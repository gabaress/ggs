import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from '@mui/material';
import centerElements from './styling/centerStyling';

function ModuleIndividual() {

    const { id } = useParams();
    const [module, setModule] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/${id}`)
        .then(response => response.json())
        .then(data => {
            setModule(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [id]);

    function getCohortLink(url) {
        let code = url.split("/")[url.split("/").length - 2];

        return (
            <Link to={`/cohorts/${code}`} style={{textDecoration: "none"}}>
                {code}
            </Link>
        )
    }

    function renderCohortList(module) {
        return (
            <div>
                {(module).map((cohort ) => (
                    <div key={cohort}>
                        {getCohortLink(cohort)}
                    </div>
                ))}
            </div>
        )
    }

    function modulePlacard(module) {

        return (
            <Card sx={{ maxWidth: "30vw", marginBottom: 2, ...centerElements, border: "5px solid turquoise", borderRadius: "10px" }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                {module.full_name}
                </Typography>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                    Code:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" component="span">
                    {module.code}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                    CA Split:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" component="span">
                    {module.ca_split}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                    Delivered To:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" component="span">
                    {module.delivered_to ? renderCohortList(module.delivered_to) : "None"}
                    </Typography>
                </Grid>
                </Grid>
            </CardContent>
            </Card>
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
            <h1 style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>Module Details</h1>
            <div style={{...centerElements}}>
            {modulePlacard(module)}
            </div>
        </div>
    )
    }
}

export default ModuleIndividual;