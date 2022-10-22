import React from 'react';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ItemLib from '../lib/ItemLib';

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
        <Avatar src={ItemLib[option].image} alt={ItemLib[option].name} />
        {ItemLib[option]?.name}
      </MenuItem>
    )),
  ];

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Item</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        // value={age}
        label="Age"
        onChange={handleChange}
      >
        {renderOptions}
      </Select>
      <FormHelperText>Add an Item to the Box</FormHelperText>
    </FormControl>
  );
};

export default AddNewItem;
