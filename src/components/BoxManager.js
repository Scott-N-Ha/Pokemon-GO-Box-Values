import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';

import Box from './Box';

import '../styles/BoxManager.scss';

const BoxManager = ({ pricingState = 'Fallback pricing' }) => {
  const [boxes, setBoxes] = useState([]);

  const handleAddBox = () => {
    const newDate = new Date();
    setBoxes(prevBoxes => [
      ...prevBoxes,
      <Box key={newDate.getTime()} />
    ]);
  };

  const AddNewBox = () => (
    <div className='BoxManager__AddNewBox'>
      <Button
        onClick={handleAddBox}
        startIcon={<FontAwesomeIcon icon={faPlus} />}
        variant="contained"
        sx={{
          borderRadius: '999px',
          px: 3,
          py: 1.25,
          fontWeight: 700,
          textTransform: 'none',
          background: 'linear-gradient(135deg, #ffcb05 0%, #ff8a00 100%)',
          boxShadow: '0 12px 30px rgba(255, 144, 0, 0.35)',
          color: '#11213b',
          '&:hover': {
            background: 'linear-gradient(135deg, #ffd84d 0%, #ff9d1b 100%)',
            boxShadow: '0 16px 34px rgba(255, 144, 0, 0.45)',
          },
        }}
      >
        Add New Box
      </Button>
    </div>
  );

  return (
    <div className="BoxManager">
      <div className="BoxManager__Summary">
        <div className="BoxManager__SummaryCard">
          <span className="BoxManager__SummaryCardLabel">Open boxes</span>
          <strong>{boxes.length}</strong>
        </div>
        <div className="BoxManager__SummaryCard">
          <span className="BoxManager__SummaryCardLabel">Data source</span>
          <strong>{pricingState}</strong>
        </div>
      </div>
      <div className='BoxManager__Boxes'>
        {boxes}
      </div>
      <AddNewBox />
    </div>
  );
};

export default BoxManager;
