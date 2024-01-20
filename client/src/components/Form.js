import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Form = () => {
    return (
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" label="Enter your keyword" variant="standard" />
            <Button variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
        </Box>
    );
};

export default Form;