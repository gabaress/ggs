import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function NewDegree() {

    const [inputs, setInputs] = useState({
        full_name: '',
        shortcode: '',
    });

    const [errors, setErrors] = useState({
        full_name: '',
        shortcode: '',
    });

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
          full_name: inputs.full_name.trim() === '',
          shortcode: inputs.shortcode.trim() === '',
        };

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateInput()) {
            fetch(`http://127.0.0.1:8000/api/degree/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs), 
            }).then(() => {
                console.log("Degree creation successful.")
                alert("Degree created successfully.");
                window.location.reload();
            }).catch((error) => {
                console.error("Error creating degree:", error);
                alert("Error creating degree.");
            });
        }
    };

    function degreeForm() {

        return (
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            >
            <div>
                <TextField
                required
                error={errors.full_name}
                id="full-name"
                name="full_name"
                label="Full Name"
                value={inputs.full_name}
                onChange={handleChange}
                helperText={errors.full_name && "Full Name is required"}
                />
                <TextField
                required
                error={errors.shortcode}
                id="short-code"
                name="shortcode"
                label="Shortcode"
                value={inputs.shortcode}
                onChange={handleChange}
                helperText={errors.shortcode && "Shortcode is required"}
                />
            </div>
            <Button type="submit" variant="contained" sx={{ m: 1 }}>
                Submit
            </Button>
            </Box>
        )
    }

    return (
        <div>
           <h1 style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>Create Degree</h1>
           {degreeForm()}
        </div>
    )
}

export default NewDegree;