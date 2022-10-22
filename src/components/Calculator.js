import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

import AddNewItem from './AddNewItem';
import { getRandomBox } from './BoxesLib';
import Item from './Item';
import ItemLib from './ItemLib';

import './Calculator.scss';

const Calculator = props => {
  const { boxNum = 0 } = props;
  const [items, setItems] = React.useState([]);
  const [counts, setCounts] = React.useState({});
  const [price, setPrice] = React.useState(0);
  const [title, setTitle] = React.useState('');

  const renderItems = items.map(item => (
    <Item key={item} item={item} setCounts={setCounts} />
  ));

  const remainingOptions = Object.keys(ItemLib).filter(i => !items.includes(i));

  const total = Object.values(counts).reduce((acc, item) => acc + (ItemLib[item.name].cost * item.count), 0);
  const costEfficiency = ((total / price) * 100).toFixed(2);

  return (
    <div className='Calculator'>
      {getRandomBox().imageComponent}
      <input
        type='text'
        id='box-title'
        name='box-title'
        placeholder='Box Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className='Calculator__Total'>
        Total: {total}
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
