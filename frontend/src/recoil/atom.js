import { atom } from 'recoil';

const getSessionItem = (keyName, initial) => {
  const item = sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : initial;
  return item;
};

const getSessionItemArray = (keyName, initial) => {
  const item = sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : initial;
  let items = item.split(',');
  if (items[0] === '') {
    items = [];
  }
  return items;
};

const getSessionItemToNum = (keyName, initial) => {
  let items = getSessionItemArray(keyName, initial);
  if (!items.length) return [];
  items = items.map((item) => Number(item));
  return items;
};

export const range = atom({
  key: 'range',
  default: getSessionItem('range', '전체'),
});

export const brand = atom({
  key: 'brand',
  default: getSessionItemArray('brand', ''),
});

export const grade = atom({
  key: 'grade',
  default: getSessionItemArray('grade', ''),
});

export const shape = atom({
  key: 'shape',
  default: getSessionItemArray('shape', ''),
});

export const method = atom({
  key: 'method',
  default: getSessionItemArray('method', ''),
});

export const fuel = atom({
  key: 'fuel',
  default: getSessionItemArray('fuel', ''),
});

export const cost = atom({
  key: 'cost',
  default: getSessionItemToNum('cost', '0,9'),
});

export const displacement = atom({
  key: 'displacement',
  default: getSessionItemToNum('displacement', '0,5'),
});

export const fuelEfficiency = atom({
  key: 'fuelEfficiency',
  default: getSessionItemToNum('fuelEfficiency', '0,5'),
});

export const name = atom({
  key: 'name',
  default: getSessionItem('name', ''),
});
