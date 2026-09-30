import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ItemLib from '../lib/ItemLib';

import '../styles/AddNewItem.scss';

const AddNewItem = props => {
  const { options, setItems } = props;

  const handleChange = e => {
    if (e.target.value !== '') {
      setItems(prevItems => [...prevItems, e.target.value]);
    }
  };

  const renderOptions = [
    <MenuItem key='none-option' value="">
      <em>None</em>
    </MenuItem>,
    ...options.map(option => (
      <MenuItem key={`${option}-option`} value={option}>
        <img className='option-img' src={ItemLib[option].image} alt={ItemLib[option].name} />
        {ItemLib[option]?.name}
      </MenuItem>
    )),
  ];

  return (
    <FormControl sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id="item-select-label">Item</InputLabel>
      <Select
        labelId="item-select-label"
        id="item-select-helper"
        value=''
        label="Item"
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: 3,
              mt: 1,
              backgroundColor: '#101a2d',
              color: '#edf4ff',
              border: '1px solid rgba(148, 163, 184, 0.22)',
            },
          },
        }}
      >
        {renderOptions}
      </Select>
      <FormHelperText>Add an item to the box</FormHelperText>
    </FormControl>
  );
};

export default AddNewItem;
