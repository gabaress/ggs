import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Box, FormHelperText } from '@mui/material';

function NewCohort() {
    
    const [inputs, setInputs] = useState({
        id: "",
        year: "",
        degree: "",
    });

    const [errors, setErrors] = useState({
        id: "",
        year: "",
        degree: "",
    });

    const [degrees, setDegrees] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [listErrors, setListErrors] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/`)
            .then((response) => response.json())
            .then((data) => {
                setDegrees(data);
            })
            .catch((error) => {
                console.error("Error fetching degrees:", error);
            });
    }, []);

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
          id: inputs.id.trim() === '',
          year: inputs.year.trim() === '',
          degree: selectedOption === '',
        };

        if (selectedOption === '') {
            setListErrors('Please select a degree.');
        }

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const handleForm = (event) => {
        if (event.target.value !== "") {
            setListErrors('');
        }

        setSelectedOption(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateInput()) {
    
            let toPost = {
                id: inputs.id,
                year: parseInt(inputs.year),
                degree: selectedOption,
            };

            fetch(`http://127.0.0.1:8000/api/cohort/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toPost), 
            }).then(() => {
                console.log("Cohort creation successful.")
                alert("Cohort created successfully.");
                window.location.reload();
            }).catch((error) => {
                console.error("Error creating cohort:", error);
                alert("Error creating cohort.");
            });
        }
    };

    function cohortForm() {

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
            error={errors.id}
            id="idID"
            name="id"
            label="ID"
            value={inputs.id}
            onChange={handleChange}
            helperText={errors.id && "ID is required"}
            />
            <TextField
            required
            error={errors.year}
            id="yearID"
            name="year"
            label="Year"
            value={inputs.year}
            onChange={handleChange}
            helperText={errors.year && "Year is required"}
            />
            <FormControl fullWidth error={listErrors}>
                <InputLabel id="degreeLabelID">Degree</InputLabel>
            <Select
            required
            labelId="degreeLabelID"
            id="degreeID"
            label="Option"
            value={selectedOption}
            onChange={handleForm}
            >
                {degrees.map((degree) => (
                <MenuItem value={`http://127.0.0.1:8000/api/degree/${degree.shortcode}/`}>{degree.full_name}</MenuItem>
                ))}
            </Select>
            {listErrors && <FormHelperText>Degree selection is required</FormHelperText>}
            </FormControl>
            </div>
            <Button type="submit" variant="contained" sx={{ m: 1 }}>
            Submit
            </Button>
            </Box>
        )

        
    }

    return (
        <div>
            <h1 style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>Create Cohort</h1>
            {cohortForm()}
            <div style={{marginBottom: "5vh"}}></div>
        </div>
    )

}

export default NewCohort;