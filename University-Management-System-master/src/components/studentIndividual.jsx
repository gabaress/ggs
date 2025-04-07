import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, Avatar, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function StudentIndividual() {

    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [grades, setGrades] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cohortID, setCohortID] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${id}`)
        .then(response => response.json())
        .then(data => {
            setStudent(data);
            setIsLoaded(true);
            setCohortID(data.cohort.split("/")[data.cohort.split("/").length - 2]);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`)
        .then(response => response.json())
        .then(data => {
            setGrades(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [id]);

    function getMod(url) {

        let id = url.split("/")[url.split("/").length - 2];

        return (
            <Link to={`/modules/${id}`} style={{textDecoration: "none"}}>
             {id}
            </Link>
        )
    }
    
    function studentRefHandler(student) {

        return (
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2, maxWidth: 600, margin: 'auto', marginTop: "5vh", border: "5px solid turquoise", borderRadius: "50px" }}>
            {/* Avatar on the left */}
            <Avatar
                src={`${process.env.PUBLIC_URL}/default.jpg`}
                sx={{ width: 56, height: 56, marginRight: 2 }}
                alt="Profile Picture"
            />
            {/* Content on the right */}
            <CardContent sx={{ flex: '1 0 auto' }}>
                {/* Main heading - Username */}
                <Typography variant="h4" component="div">
                {student.first_name} {student.last_name}
                </Typography>
                {/* Additional info */}
                <Typography variant="h6" color="text.secondary">
                ID: {student.student_id}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                Cohort: {cohortID}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                <EmailOutlinedIcon /> {student.email}
                </Typography>
            </CardContent>
            </Card>
        );
    }

    function gradesRefHandler(grades) {

        return (
            <div>
                <h2 style={{textAlign: "center", marginTop: "5vh", border: "4px solid turquoise", borderRadius: "5px"}}>Modules + Grades</h2>
                <Button component={Link} to="edit" variant="contained" sx={{ m: 1, color: "white", margin: "auto", marginBottom: "2.5vh" }} fullWidth>
                Edit Grades
                </Button>
                <TableContainer component={Paper}>
                <Table aria-label="grades table" style={{border: "2px solid turquoise", borderRadius: "25px"}}>
                    <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: 'turquoise', color: 'white' }}>Module</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: 'turquoise', color: 'white' }}>CA Mark</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: 'turquoise', color: 'white' }}>Exam Mark</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: 'turquoise', color: 'white' }}>Total Grade</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {grades.map((grade) => (
                        <TableRow key={grade}>
                        <TableCell component="th" scope="row">
                            {getMod(grade.module)}
                        </TableCell>
                        <TableCell align="right">{grade.ca_mark}</TableCell>
                        <TableCell align="right">{grade.exam_mark}</TableCell>
                        <TableCell align="right">{grade.total_grade}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
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
                {studentRefHandler(student)}
                <div style={{maxWidth: "32.5vw", margin: "auto", marginBottom: "3vh"}}>
                {gradesRefHandler(grades)}
                </div>
            </div>
        )
    }
}

export default StudentIndividual;