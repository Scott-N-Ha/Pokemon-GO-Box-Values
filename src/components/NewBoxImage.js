import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { BoxesLib } from '../lib/BoxesLib';

import '../styles/NewBoxImage.scss';

const NewBoxImage = props => {
  const {
    box,
    open,
    setBox,
    setOpen,
  } = props;

  console.log('box', box);

  const boxOptions = Object.values(BoxesLib).map(b => (
    <div className={`NewBoxImage__BoxOption ${box.item === b.item ? 'Selected' : ''}`} key={b} onClick={() => {
      setBox(b);
      setOpen(false);
    }}>
      <img className='NewBoxImage__BoxOption__Img' src={b.image} alt={b.name} />
    </div>
  ));

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <div className='NewBoxImage'>
        <DialogTitle>Choose Box Image</DialogTitle>
        <div className='NewBoxImage__Options'>
          {boxOptions}
        </div>
      </div>
    </Dialog>
  );
};

export default NewBoxImage;
