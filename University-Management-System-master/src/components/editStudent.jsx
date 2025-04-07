import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import EmailOutlined from '@mui/icons-material/EmailOutlined';

function EditGrade() {

    let { id } = useParams();
    const [student, setStudent] = useState({});
    const [grades, setGrades] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [inputs, setInputs] = useState({
        ca: "",
        exam: "",
        gradeObject: null,
    });

    const [errors, setErrors] = useState({
        ca: "",
        exam: "",
        gradeObject: null,
    });

    const [selectedOption, setSelectedOption] = useState(null);
    const [listErrors, setListErrors] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${id}`)
        .then(response => response.json())
        .then(data => {
            setStudent(data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`)
        .then(response => response.json())
        .then(data => {
            setGrades(data);
            setIsLoaded(true);
        })
    }, [id]);
    
    function getCohortLink(url) {
        let code = url?.split("/")[url?.split("/").length - 2];

        return (
            <Link to={`/cohorts/${code}`} style={{textDecoration: "none"}}>
                {code}
            </Link>
        )
    }

    function getMod(url) {
        let code = url?.split("/")[url?.split("/").length - 2];

        return code;
    }

    function studentRefHandler(student) {

        return (
            <div>
            <div style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>
                <Typography variant="h4" style={{margin: "auto"}}>Editing Grades for </Typography>
                <Typography variant="h4" style={{margin: "auto"}}>{student.first_name} {student.last_name}</Typography>
                <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" style={{ marginLeft: "10vw" }}>Student ID: {student.student_id}</Typography>
                <Typography variant="body1"><EmailOutlined /> {student.email}</Typography>
                <Typography variant="body1" style={{ marginRight: "10vw" }}> {getCohortLink(student.cohort)}</Typography>
            </div>
            </div>
            </div>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
          ...prev,
          [name]: value,
        }));
        
        if (errors[name] && value.trim() !== '') {
          setErrors((prev) => ({
            ...prev,
            [name]: false,
          }));
        }
    };

    const validateInput = () => {
        const newErrors = {
          ca: inputs.ca.trim() === '',
          exam : inputs.exam.trim() === '',
          gradeObject: selectedOption === null,
        };

        if (selectedOption === null) {
            setListErrors('Please select a module.');
        }

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const handleForm = (event) => {
        if (event.target.value !== null) {
            setListErrors('');
        }

        setSelectedOption(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateInput()) {
    
            let toPost = {
                module: selectedOption.module,
                ca_mark: inputs.ca,
                exam_mark: inputs.exam,
                cohort: selectedOption.cohort,
                student: selectedOption.student,
            };

            fetch(`http://127.0.0.1:8000/api/grade/${selectedOption.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toPost),
            }).then(() => {
                console.log("Cohort creation successful.") // REMEMBER TO CHANGE FOR EACH FORM
                alert("Cohort created successfully.");
                window.location.reload();
            }).catch((error) => {
                console.error("Error creating cohort:", error);
                alert("Error creating cohort.");
            });

        }
    }

    function gradeForm(grade) {
        return (
            <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            '& .MuiFormControl-root': { m: 1, minWidth: 120 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <TextField
            required
            error={errors.ca}
            id="caID"
            name="ca"
            label="CA mark"
            value={inputs.ca}
            onChange={handleChange}
            helperText={errors.ca && "CA mark is required"}
            />
            <TextField
            required
            error={errors.exam}
            id="examID"
            name="exam"
            label="Exam mark"
            value={inputs.exam}
            onChange={handleChange}
            helperText={errors.exam && "Exam mark is required"}
            />
            <FormControl fullWidth error={listErrors}>
                <InputLabel id="moduleLabelID">Module</InputLabel>
            <Select
            required
            labelId="moduleLabelID"
            id="moduleID"
            label="Option"
            value={selectedOption}
            onChange={handleForm}
            >
                {grades.map((grade) => (
                <MenuItem value={grade}>{getMod(grade.module)}</MenuItem>
                ))}
            </Select>
            {listErrors && <FormHelperText>Module selection is required</FormHelperText>}
            </FormControl>
            </div>
            <Button type="submit" variant="contained" sx={{ m: 1 }}>
            Submit
            </Button>
            </Box>
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
                {gradeForm(grades)}
            </div>
        )
    }
}

export default EditGrade;