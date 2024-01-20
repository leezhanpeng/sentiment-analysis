import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../styles/Form.css';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

const Form = () => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
        }, 500);
    
        return () => {
          clearInterval(timer);
        };
    }, []);

    const analyseHandler = e => {
        e.preventDefault();

        setIsLoading(true);
        
        // TODO: call backend to analyse
        // axios.post('URL');
    }

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
            <TextField 
                id="standard-basic" 
                label="Enter your keyword" 
                variant="standard"
                onChange={e => setText(e.target.value)}
            />
            {
                isLoading
                    ? <LinearProgress variant="determinate" value={progress} />
                    : (
                        <Button 
                            variant="contained" 
                            endIcon={<SendIcon />}
                            onClick={analyseHandler}>
                            Analyse
                        </Button>
                    )
            }
        </Box>
    );
};

export default Form;