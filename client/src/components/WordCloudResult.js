import *  as React from 'react';
import ReactWordcloud from 'react-wordcloud';
import {useEffect, useState} from 'react';
const WordCloudResult = ({analyseTopics}) =>{
    const [items, setItems] = useState([]); 
    useEffect(()=>{
        const keyValueArray = Object.entries(analyseTopics);
        const sorted = keyValueArray.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
        const mult = sorted.map(([text, value]) => ({text, value: parseInt(value * 1000)}));
        setItems(mult);    
    },[]);

    const options = {
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        enableTooltip: true,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [5, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 1000
    };

    return(
        <div>
            <ReactWordcloud options={options} words={items} />   
        </div>

    )


};


export default WordCloudResult;
