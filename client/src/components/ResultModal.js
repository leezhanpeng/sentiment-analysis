import * as React from 'react';
import Box from '@mui/material/Box';
import BarChartResult from './BarChartResult';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WordCloudResult from './WordCloudResult';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ResultModal = ({ 
  isVisible, 
  setIsVisible, 
  analyseResults,
  analyseTopics,
}) => {
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <Modal
        open={isVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Results
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            { analyseResults["text"] }
          </Typography>
          <WordCloudResult analyseTopics={analyseTopics} />
          <BarChartResult
            analyseResults={analyseResults}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default ResultModal;
