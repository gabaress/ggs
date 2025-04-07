import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ background: 'turquoise', color: "white"}}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          UniSys
        </Typography>

        <Button color="inherit" component={Link} to="/degrees">Degrees</Button>
        <Button color="inherit" component={Link} to="/cohorts">Cohorts</Button>
        <Button color="inherit" component={Link} to="/modules">Modules</Button>
        <Button color="inherit" component={Link} to="/students">Students</Button>
        <Button color="inherit" component={Link} to="/create-degree">Create Degree</Button>
        <Button color="inherit" component={Link} to="/create-cohort">Create Cohort</Button>
        <Button color="inherit" component={Link} to="/create-module">Create Module</Button>
        <Button color="inherit" component={Link} to="/create-student">Create Student</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
