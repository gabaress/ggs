import { Card, CardContent, Typography, List, ListItem, ListItemText} from "@mui/material";
import Button from '@mui/material/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import centerElements from "./styling/centerStyling";

function CohortIndividual() {
    const { id } = useParams();
    const [students, setStudent] = useState([]);
    const [cohort, setCohort] = useState({});
    const [modules, setModules] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/${id}`)
        .then(response => response.json())
        .then(data => {
            // cohort.current = data;
            setCohort(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/?cohort=${id}`)
        .then(response => response.json())
        .then(data => {
            setStudent(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${id}`)
        .then(response => response.json())
        .then(data => {
            setModules(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [id]);

    function cohortRefHandler(cohort) {

        return (
            <div>
            <div style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>
                <Typography variant="h4" style={{margin: "auto"}}>{cohort.name}</Typography>
                <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" style={{ marginLeft: "10vw" }}>ID: {cohort.id}</Typography>
                <Typography variant="body1" style={{ marginRight: "10vw" }}>Year: {cohort.year}</Typography>
            </div>
            </div>
            </div>
        )
    }

    function studentRefHandler(students) {

        return (
            <div style={centerElements}>
                {students.map((student, index) => (
                    <Button component={Link} to={`/students/${student.student_id}`} sx={{variant: "string"}} style={{ textTransform: "none" }}>
                        <Card key={index} style={{ margin: "10px", minWidth: "45vw", }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {student.first_name} {student.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Student ID: {student.student_id}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <EmailOutlinedIcon style={{fontSize: "small"}} /> {student.email}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Button>
                ))}
            </div>
        );
    }

    function moduleRefHandler(modules) {

        return (
            <div style={{ display: "flex", justifyContent: "center", margin: "2.5vh"}}>
                <List style={{border: "2px solid turquoise", borderRadius: "15px"}}>
                    {modules.map((module, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography component="span" variant="body1" style={{ fontWeight: 'bold' }}>
                                        <Link to={`/modules/${module.code}`} style={{textDecoration: "none"}}>{module.code}</Link>
                                        </Typography>
                                        {" "}{module.full_name}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
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
            {cohortRefHandler(cohort)}
            <h2 style={{...centerElements, textAlign: "center", marginTop: "5vh", border: "4px solid turquoise", borderRadius: "5px", maxWidth: "50vw", margin: "0 auto"}}>Modules</h2>
            {moduleRefHandler(modules)}
            <h2 style={{...centerElements, textAlign: "center", marginTop: "5vh", border: "4px solid turquoise", borderRadius: "5px", maxWidth: "85vw", margin: "0 auto"}}>Students</h2>
            <ul>
                {studentRefHandler(students)}
            </ul>
            </div>
        );
    }

}

export default CohortIndividual;