import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

import AddNewItem from './AddNewItem';
import Item from './Item';
import ItemLib from '../lib/ItemLib';
import PokeCoin from '../images/PokeCoin.png';
import { getRandomBox } from '../lib/BoxesLib';

import '../styles/Calculator.scss';

const Calculator = props => {
  const { boxNum = 0 } = props;

  const [box, setBox] = useState(getRandomBox());
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {

  }, []);

  const renderItems = items.map(item => (
    <Item key={item} item={item} setCounts={setCounts} />
  ));

  const remainingOptions = Object.keys(ItemLib).filter(i => !items.includes(i));

  const total = Object.values(counts).reduce((acc, item) => acc + (ItemLib[item.name].cost * item.count), 0);
  const costEfficiency = ((total / price) * 100).toFixed(2);

  return (
    <div className='Calculator'>
      <img className='Calculator__Box' src={box.image} alt={box.name} />
      <input
        type='text'
        id='box-title'
        name='box-title'
        placeholder='Box Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className='Calculator__Total'>
        Total: {total} <img className='PokeCoin' src={PokeCoin} alt='Poke Coin' />
      </div>
      <div className='Calculator__Cost'>
        Box Price:
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
      {!!total && !!price && (
        <div className='Calculator__CostEfficiency'>
          Cost Efficiency: {costEfficiency}% <Tooltip title="Cost Efficiency = Total / Price"><InfoIcon /></Tooltip>
        </div>
      )}
      <div className='Calculator__Items'>
        {renderItems}
      </div>
      <AddNewItem options={remainingOptions} setItems={setItems} />
    </div>
  )
};

export default Calculator;
