import React, { useState, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';

const Progress = () => {
    const [progress, setProgress] = useState(0);

    console.log(progress);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress >= 90) {
              return oldProgress; // make it stuck at 90 until we get back the result
            }
            const diff = Math.random() * 8;
            return Math.min(oldProgress + diff, 100);
          });
        }, 500);
    
        return () => {
          clearInterval(timer);
        };
    }, []);

    return (
        <LinearProgress variant="determinate" value={progress} />
    );
};

export default Progress;