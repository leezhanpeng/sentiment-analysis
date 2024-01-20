import React, { useState, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';

const Progress = ({ isFinished, showResults }) => {
    const [progress, setProgress] = useState(0);

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

        let finishTimer;
        if (isFinished) {
          clearInterval(timer);

          finishTimer = setInterval(() => {
            setProgress((oldProgress) => {
              const diff = Math.random() * 1;
              return Math.min(oldProgress + diff, 100);
            });
          }, 500);
        }
    
        return () => {
          clearInterval(timer);
          clearInterval(finishTimer);
        };
    }, [isFinished]);

    useEffect(() => {
      if (isFinished && progress >= 100) {
          showResults();
      }
  }, [isFinished, progress]);

    return (
        <LinearProgress variant="determinate" value={progress} />
    );
};

export default Progress;