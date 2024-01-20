import * as React from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

const BarChartResult = ({ analyseResults }) => {
  const highlightScope = {
    highlighted: 'series',
    faded: 'global',
  };

  const series = [
    {
      label: 'Positive',
      data: [
        analyseResults["POS"]
      ],
    },
    {
      label: 'Neutral',
      data: [
        analyseResults["NEU"]
      ],
    },
    {
      label: 'Negative',
      data: [
        analyseResults["NEG"]
      ],
    },
  ].map((s) => ({ ...s, highlightScope }));

  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        height={300}
        series={series.map((s) => ({ ...s, data: s.data.slice(0, 1) }))}
      />
    </Box>
  );
}

export default BarChartResult;