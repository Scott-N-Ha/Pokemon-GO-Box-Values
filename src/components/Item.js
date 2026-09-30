import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import ItemLib from '../lib/ItemLib';
import PokeCoin from '../images/PokeCoin.png';

import '../styles/Item.scss';

const Item = props => {
  const { item, initialCount = 0, setCounts, setItems } = props;

  const [count, setCount] = useState(Number(initialCount) || 0);

  useEffect(() => {
    const normalizedCount = Number(initialCount) || 0;
    setCount(normalizedCount);
    setCounts(prevCounts => ({ ...prevCounts, [item]: { name: item, count: normalizedCount } }));
  }, [initialCount, item, setCounts]);

  const handleChange = e => {
    const nextValue = Number(e.target.value) || 0;
    setCount(nextValue);
    setCounts(prevCounts => ({ ...prevCounts, [item]: { name: item, count: nextValue } }));
  };

  const handleDeleteItem = () => {
    setCounts(prevCounts => {
      const nextCounts = { ...prevCounts };
      delete nextCounts[item];
      return nextCounts;
    });
    setItems(prevItems => prevItems.filter(i => i !== item));
  };

  const total = ItemLib[item].cost * count;

  return (
    <div className='Item'>
      <img className='Item__Avatar' src={ItemLib[item].image} alt={ItemLib[item].name} />
      <span className='Item__Name'>
        {ItemLib[item].name} {!!ItemLib[item].tooltip && (
          <Tooltip title={ItemLib[item].tooltip}>
            <FontAwesomeIcon icon={faCircleInfo} />
          </Tooltip>
        )}
      </span>
      <div className='Item__Count'>
        Count:
        <input
          type="number"
          id={`${item}-count-id`}
          name={`${item}-count`}
          max={9999}
          min={0}
          value={count}
          onChange={handleChange}
        />
      </div>
      <div className='Item__Total'>{total} <img className='PokeCoin' src={PokeCoin} alt='Poke Coin' /></div>
      <FontAwesomeIcon className='Item__Delete' icon={faTrashCan} onClick={handleDeleteItem} />
    </div>
  );
};

export default Item;
