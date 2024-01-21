import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../styles/Form.css';
import ResultModal from "./ResultModal";
import axios from 'axios';
import Progress from "./Progress";
import Select from 'react-select';

const Form = () => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [analyseResults, setAnalyseResults] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [analyseTopics, setAnalyseTopics] = useState({});
    const [sort, setSort] = useState("relevance");
    const [time, setTime] = useState("all");
    const [depth, setDepth] = useState("medium");
    
    const sortFilter = [
        { value: 'relevance', label: 'Relevance' },
        { value: 'hot', label: 'Hot' },
        { value: 'top', label: 'Top' },
        {value: 'new', label: 'New'}
    ]
    const timeFilter = [
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' },
        { value: 'all', label: 'All' },
    ]
    const depthFilter = [
        { value: 'low', label: 'low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
    ]
    const showResults = () => {
        setModalVisible(true);
        setText("");
        setIsFinished(false);
        setIsLoading(false);
    }

    const analyseHandler = e => {
        e.preventDefault();

        setIsLoading(true);
        
        // TODO: call backend to analyse, get back the result (apparently will get back 3 number, positive, neutral, negative)
        axios.post('http://127.0.0.1:5000/searchPost', {
            searchString: text,
            sortFilter: sort,
            timeFilter: time,
            depth: depth
        }).then((response) => {
            console.log(response);
            setIsFinished(true);
            setText(text)
            setAnalyseResults(response.data.sentiments);
            setAnalyseTopics(response.data.topics);
        }).catch((error) => {
            console.log(error);
        })


        // temporary 20s timeout to simulate waiting.
        // setTimeout(() => {

        //     const response = { 'POS': 0.0833340648240058, 'NEU': 0.5326293129903132, 'NEG': 0.3840466234927075 };
        // }, 20000);
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
        <div className={"filtersection"}>
        <label className={"filtertitle"} >Sort by:</label>
        <Select
        options={sortFilter}
        defaultValue={{ value: 'relevance', label: 'Relevance' }}
        onChange={e => {
            setSort(e.value);
        }}
        />

        </div>

        <div className={"filtersection"}>
        <label className={"filtertitle"} >Time:</label>
        <Select
        options={timeFilter}
        defaultValue={{ value: 'all', label: 'All' }}
        onChange={e => {
            setTime(e.value);
        }}
        />

        </div>
        <div className={"filtersection"}>
        <label className={"filtertitle"} >Depth:</label>
        <Select
        options={depthFilter}
        defaultValue={{ value: 'medium', label: 'Medium' }}
        onChange={e => {
            setDepth(e.value);
        }}
        />

        </div>

                                <TextField 
                id="standard-basic" 
                label="Enter your keyword" 
                variant="standard"
                autoFocus
                value={text}
                onChange={e => setText(e.target.value)}
            />
            {
                isLoading
                    ? <Progress isFinished={isFinished} showResults={showResults} />
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
                analyseTopics={analyseTopics}
            />
        </Box>
    );
};

export default Form;
