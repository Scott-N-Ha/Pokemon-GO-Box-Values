import React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import ItemLib from './ItemLib';

import './Item.scss';

const Item = props => {
  const { item, setCounts } = props;

  const [count, setCount] = React.useState(0);

  const handleChange = e => {
    setCount(e.target.value);
    setCounts(prevCounts => ({ ...prevCounts, [item]: { name: item, count: e.target.value } }));
  };

  const total = ItemLib[item].cost * count;

  return (
    <div className='Item'>
      <Avatar src={ItemLib[item].image} alt={ItemLib[item].name} />
      {ItemLib[item].name}
      <input
        type="number"
        id={`${item}-count-id`}
        name={`${item}-count`}
        max={9999}
        min={0}
        onChange={handleChange}
      />
      <div className='Item__total'>Total: {total}</div>
    </div>
  );
};

export default Item;
