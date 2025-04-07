import { useState, useEffect } from 'react';
import { Box, TextField, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, FormHelperText } from '@mui/material';
import centerElements from './styling/centerStyling';

function NewModule() {

    const [inputs, setInputs] = useState({
        code: "",
        full_name: "",
        delivered_to: [],
        ca_split: "",
    });

    const [errors, setErrors] = useState({
        code: "",
        full_name: "",
        delivered_to: [],
        ca_split: "",
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [listErrors, setListErrors] = useState("");

    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
            .then((response) => response.json())
            .then((data) => {
                setCohorts(data);
            })
            .catch((error) => {
                console.error("Error fetching cohorts:", error);
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
    
    const handleList = (event) => {
        const {
          target: { value },
        } = event;

        if (event.target.value.length > 0) {
            setListErrors('');
        }

        setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
    };

    const validateInput = () => {
        const newErrors = {
          code: inputs.code.trim() === '',
          full_name: inputs.full_name.trim() === '',
          delivered_to: selectedOptions.length === 0,
          ca_split: inputs.ca_split.trim() === '',
        };

        if (selectedOptions.length === 0) {
            setListErrors('Please select at least one cohort.');
        }

        setErrors(newErrors);
    
        return !Object.values(newErrors).includes(true);
    };

    const getName = (url) => {

        let id = url.split("/")[url.split("/").length - 2];

        let name = cohorts.filter((cohort) => cohort.id === id)[0].name;

        return name;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateInput()) {
            let toPost = {
                code: inputs.code,
                full_name: inputs.full_name,
                delivered_to: selectedOptions,
                ca_split: inputs.ca_split,
            };

            fetch(`http://127.0.0.1:8000/api/module/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toPost),
            }).then(() => {
                console.log("Module created successfully.");
                alert("Module created successfully.");
                window.location.reload();
            }).catch((error) => {
                console.error("Error creating cohort:", error);
                alert("Error creating module.");
            });
        }
    };

    function moduleForm() {

        return (
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .MuiFormControl-root': { m: 1, minWidth: 120 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            >
            <div>
                <div style={{...centerElements, marginLeft: "1vw", marginBottom: "3vh"}}>
                <TextField
                required
                error={errors.code}
                id="codeID"
                name="code"
                label="Code"
                value={inputs.code}
                onChange={handleChange}
                helperText={errors.code && "Code is required"}
                />
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
                error={errors.ca_split}
                id="ca-split"
                name="ca_split"
                label="CA Split"
                value={inputs.ca_split}
                onChange={handleChange}
                helperText={errors.ca_split && "CA Split is required"}
                />
                </div>
                <FormControl fullWidth error={listErrors}>
                    <InputLabel id="multiple-cohort-label">Select Cohorts</InputLabel>
                    <Select
                    labelId="multiple-cohort-label"
                    id="multiple-cohort"
                    multiple
                    value={selectedOptions}
                    onChange={handleList}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={getName(value)} />
                        ))}
                        </Box>
                    )}
                    >
                    {cohorts.map((cohort) => (
                        <MenuItem value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}>{cohort.name}</MenuItem>
                    ))}
                    </Select>
                    {listErrors && <FormHelperText>{listErrors}</FormHelperText>}
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
            <h1 style={{ border: "5px solid turquoise", borderRadius: "50px", padding: "10px", margin: "5vh auto", maxWidth: "75vw", textAlign: "center"}}>Create Module</h1>
            {moduleForm()}
        </div>
    )
}

export default NewModule;