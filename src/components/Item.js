import React, { useState } from 'react';

import ItemLib from '../lib/ItemLib';
import PokeCoin from '../images/PokeCoin.png';

import '../styles/Item.scss';

const Item = props => {
  const { item, setCounts } = props;

  const [count, setCount] = useState(0);

  const handleChange = e => {
    setCount(e.target.value);
    setCounts(prevCounts => ({ ...prevCounts, [item]: { name: item, count: e.target.value } }));
  };

  const total = ItemLib[item].cost * count;

  return (
    <div className='Item'>
      <img className='Item__Avatar' src={ItemLib[item].image} alt={ItemLib[item].name} />
      <span className='Item__Name'>
        {ItemLib[item].name}
      </span>
      <div className='Item__Count'>
        Count:
        <input
          type="number"
          id={`${item}-count-id`}
          name={`${item}-count`}
          max={9999}
          min={0}
          onChange={handleChange}
        />
      </div>
      <div className='Item__Total'>Total: {total} <img className='PokeCoin' src={PokeCoin} alt='Poke Coin' /></div>
    </div>
  );
};

export default Item;
