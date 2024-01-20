import React from 'react';
import Form from './components/Form';
import Box from '@mui/material/Box';
import Header from './components/Header';
import './styles/Home.css';
import logo from './asset/reddit-logo.png'

const Home = () => {
    return (
        <Box className="container">
            <Header />
            <img src={logo} alt="reddit" className="logo" />
            <Form />
        </Box>
    );
};

export default Home;