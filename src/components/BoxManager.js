import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';

import Box from './Box';

import '../styles/BoxManager.scss';

const BoxManager = () => {
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
      >
        Add New Box
      </Button>
    </div>
  );

  return (
    <div className="BoxManager">
      <div className='BoxManager__Boxes'>
        {boxes}
      </div>
      <AddNewBox />
    </div>
  );
};

export default BoxManager;
