import React from 'react';
import Typography from '@mui/material/Typography';
import '../styles/Header.css';

const Header = () => {
    return (
        <Typography variant="h3" align="center" className='header-text'>
            Reddit Sentiment Analysis
        </Typography>
    );
};

export default Header;