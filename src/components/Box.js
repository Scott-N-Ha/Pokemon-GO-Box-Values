import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

import AddNewItem from './AddNewItem';
import Item from './Item';
import ItemLib from '../lib/ItemLib';
import PokeCoin from '../images/PokeCoin.png';
import { getRandomBox } from '../lib/BoxesLib';

import '../styles/Box.scss';

const Box = props => {
  const { boxNum = 0 } = props;

  const [box, setBox] = useState(getRandomBox());
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {

  }, []);

  const renderItems = items.map(item => (
    <Item key={item} item={item} setCounts={setCounts} setItems={setItems} />
  ));

  const remainingOptions = Object.keys(ItemLib).filter(i => !items.includes(i));

  const total = Object.values(counts).reduce((acc, item) => acc + (ItemLib[item.name].cost * item.count), 0);
  const costEfficiency = Number(((total / price) * 100).toFixed(2));
  const costEfficiencyColor = costEfficiency <= 50 ? 'Red'
    : costEfficiency <= 75 ? 'Orange'
      : costEfficiency < 100 ? 'Yellow'
        : costEfficiency === 100.00 ? 'Black'
          : costEfficiency > 100 && costEfficiency < 200 ? 'Green'
            : 'LightGreen';

  return (
    <div className='Box'>
      <img className='Box__Box' src={box.image} alt={box.name} />
      <input
        type='text'
        id='box-title'
        name='box-title'
        placeholder='Box Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className='Box__Total'>
        Calculated Box Total:
        <span className='Box__Total__Calculated'>{total} <img className='PokeCoin' src={PokeCoin} alt='Poke Coin' /></span>
      </div>
      <div className='Box__Cost'>
        {title || 'Box'} Price:
        <div className='Box__Cost__Input'>
        <input
          type="number"
          id="price-id"
          name="price"
          max={9999}
          min={0}
          onChange={e => setPrice(e.target.value)}
        />
          <img className='PokeCoin' src={PokeCoin} alt='Poke Coin' />
          </div>
      </div>
      {!!total && !!price && (
        <div className='Box__CostEfficiency'>
          <span className='Box__CostEfficiency__Label'>
            Cost Efficiency: <Tooltip title="Cost Efficiency = Total / Price"><InfoIcon /></Tooltip>
          </span>
          <span className={`Box__CostEfficiency__Number ${costEfficiencyColor}`}>{costEfficiency}%</span>
        </div>
      )}
      <div className='Box__Items'>
        {renderItems}
      </div>
      <AddNewItem options={remainingOptions} setItems={setItems} />
    </div>
  )
};

export default Box;
