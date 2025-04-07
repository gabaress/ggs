import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60, 
        backgroundColor: 'turquoise',
        mt: 'auto'
      }}
    >
      <Typography variant="body1" sx={{color: "white"}}>
        © 2024 Aman Ahmmed
      </Typography>
    </Box>
  );
};

export default Footer;