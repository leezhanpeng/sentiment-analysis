import React from 'react';
import Form from './components/Form';
import Box from '@mui/material/Box';
import Header from './components/Header';
import './styles/Home.css';

const Home = () => {
    return (
        <Box className="container">
            <Header />
            <Form />
        </Box>
    );
};

export default Home;