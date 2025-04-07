import React, { Fragment } from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, } from '@mui/material';
import Button from '@mui/material/Button';
import centerElements from './styling/centerStyling';

function ViewModules() {

    const [modules, setModules] = useState([]);
    const [cohort, setCohort] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/`)
        .then(response => response.json())
        .then(data => {
            setModules(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
        .then(response => response.json())
        .then(data =>  {
            setCohort(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, []);

    function renderModulesCohorts(cohorts, modules) {

        return (
            <>
            {cohorts.map((cohort) => (
              <Fragment key={cohort.id}>
                <Typography variant="h5" sx={{ margin: "4vh", ...centerElements, border: "5px solid turquoise", borderRadius: "10px" }}>
                  {cohort.name}
                </Typography>
                <div style={centerElements}>
                  {modules.filter(module => module.delivered_to.includes(`http://127.0.0.1:8000/api/cohort/${cohort.id}/`)).map((module) => (
                    <Button component={Link} to={module.code} style={{ textTransform: "none" }}>
                        <Card key={module.code} style={{ margin: "10px", minWidth: "45vw", }}>
                            <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Code: {module.code}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {module.full_name}
                            </Typography>
                            </CardContent>
                        </Card>
                    </Button>
                  ))}
                </div>
              </Fragment>
            ))}
          </>
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
            <h1 style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>All Modules</h1>
            {renderModulesCohorts(cohort, modules)}
        </div>
    )
    }
}

export default ViewModules;