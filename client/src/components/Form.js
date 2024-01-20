import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../styles/Form.css';
import ResultModal from "./ResultModal";
import axios from 'axios';
import Progress from "./Progress";

const Form = () => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [analyseResults, setAnalyseResults] = useState({});

    const analyseHandler = async e => {
        e.preventDefault();

        setIsLoading(true);
        
        // TODO: call backend to analyse, get back the result (apparently will get back 3 number, positive, neutral, negative)
        // const response = await axios.post('http://127.0.0.1:5000/searchPost', {
            // searchString: text
        // });
        // setAnalyseResults(response);
        // setModalVisible(true);
        // setIsLoading(false);
        // setText("");

        // temporary 10s timeout to simulate waiting.
        setTimeout(() => {
            // I DON'T KNOW HOW TO SMOOTH SCROLL TO 100%... (But still can finish off without it)
        
            setModalVisible(true);
            setIsLoading(false);
            setText("");
        }, 20000);
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
                autoFocus
                onChange={e => setText(e.target.value)}
            />
            {
                isLoading
                    ? <Progress />
                    : (
                        <Button 
                            variant="contained" 
                            endIcon={<SendIcon />}
                            onClick={analyseHandler}>
                            Analyse
                        </Button>
                    )
            }
            <ResultModal 
                isVisible={modalVisible}
                setIsVisible={setModalVisible}
                analyseResults={analyseResults}
            />
        </Box>
    );
};

export default Form;