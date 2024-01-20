import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../styles/Form.css';

const Form = () => {
    return (
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
            className="form-container"
        >
            <TextField id="standard-basic" label="Enter your keyword" variant="standard"/>
            <Button variant="contained" endIcon={<SendIcon />}>
                Analyse
            </Button>
        </Box>
    );
};

export default Form;