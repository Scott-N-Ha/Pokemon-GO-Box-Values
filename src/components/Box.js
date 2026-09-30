import React, { useEffect, useMemo, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

import AddNewItem from './AddNewItem';
import Item from './Item';
import ItemLib from '../lib/ItemLib';
import NewBoxImage from './NewBoxImage';
import PokeCoin from '../images/PokeCoin.png';
import { getBox, getRandomBox } from '../lib/BoxesLib';

import '../styles/Box.scss';

const resolveInitialItems = (initialData = null) => {
  if (!initialData || !Array.isArray(initialData.items)) {
    return [];
  }

  return initialData.items
    .map((item) => item?.key)
    .filter((key) => !!key && !!ItemLib[key]);
};

const resolveInitialCounts = (initialData = null) => {
  if (!initialData || !Array.isArray(initialData.items)) {
    return {};
  }

  return initialData.items.reduce((acc, item) => {
    const key = item?.key;
    const count = Number(item?.count);

    if (!key || !ItemLib[key] || !Number.isFinite(count) || count <= 0) {
      return acc;
    }

    acc[key] = { name: key, count };
    return acc;
  }, {});
};

const Box = ({ version = 0, initialData = null, fallbackTitle = '' }) => {
  const [box, setBox] = useState(getRandomBox());
  const [boxOpen, setBoxOpen] = useState(false);
  const [items, setItems] = useState(resolveInitialItems(initialData));
  const [counts, setCounts] = useState(resolveInitialCounts(initialData));
  const [price, setPrice] = useState(Number(initialData?.price) || 0);
  const [title, setTitle] = useState(initialData?.title || fallbackTitle || '');

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setItems(resolveInitialItems(initialData));
    setCounts(resolveInitialCounts(initialData));
    setPrice(Number(initialData?.price) || 0);
    setTitle(initialData?.title || fallbackTitle || '');
  }, [initialData, fallbackTitle]);

  useEffect(() => {
    if (!initialData?.boxKey) {
      return;
    }

    const mappedBox = getBox(initialData.boxKey);
    if (mappedBox) {
      setBox(mappedBox);
    }
  }, [initialData]);

  const renderItems = items.map(item => (
    <Item
      key={`${item}-${version}`}
      item={item}
      initialCount={counts[item]?.count ?? 0}
      setCounts={setCounts}
      setItems={setItems}
    />
  ));

  const remainingOptions = useMemo(
    () => Object.keys(ItemLib).filter((itemKey) => !items.includes(itemKey)),
    [items],
  );

  const total = Object.values(counts).reduce((acc, item) => {
    const nextCount = Number(item.count) || 0;
    return acc + (ItemLib[item.name].cost * nextCount);
  }, 0);

  const priceNumber = Number(price) || 0;
  const costEfficiency = priceNumber > 0 ? Number(((total / priceNumber) * 100).toFixed(2)) : 0;
  const costEfficiencyColor = costEfficiency <= 50 ? 'Red'
    : costEfficiency <= 75 ? 'Orange'
      : costEfficiency < 100 ? 'Yellow'
        : costEfficiency === 100.00 ? 'Black'
          : costEfficiency > 100 && costEfficiency < 200 ? 'Green'
            : 'LightGreen';

  return (
    <div className='Box'>
      <NewBoxImage
        box={box}
        open={boxOpen}
        setBox={setBox}
        setOpen={setBoxOpen}
      />
      <img className='Box__Box' src={box.image} alt={box.name} onClick={() => setBoxOpen(true)} />
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
          value={price}
          onChange={e => setPrice(Number(e.target.value) || 0)}
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
