import { atom } from 'recoil';

const getSessionItem = (keyName, initial) => {
  const item = sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : initial;
  return item;
};

const getSessionItemToNum = (keyName, initial) => {
  const item = sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : initial;
  const items = item.split(',').map((elem) => Number(elem));
  return items;
};

const getConditions = () => {
  const conditionsString = ['name', 'range'];
  const conditionsArr = ['brand', 'grade', 'shape', 'method', 'fuel'];
  const conditionsNumArr = ['displacement', 'fuelEfficiency'];
  const conditions = {};

  conditionsString.forEach((keyName) => {
    conditions[keyName] = getSessionItem(keyName, '');
  });

  conditionsArr.forEach((keyName) => {
    conditions[keyName] = getSessionItem(keyName, '').split(',');
  });

  conditionsNumArr.forEach((keyName) => {
    conditions[keyName] = getSessionItemToNum(keyName, '0,5');
  });

  conditions.cost = getSessionItemToNum('cost', '0,9');

  return conditions;
};

export const range = atom({
  key: 'range',
  default: getSessionItem('range', '전체'),
});

export const brand = atom({
  key: 'brand',
  default: getSessionItem('brand', '').split(','),
});

export const grade = atom({
  key: 'grade',
  default: getSessionItem('grade', '').split(','),
});

export const shape = atom({
  key: 'shape',
  default: getSessionItem('shape', '').split(','),
});

export const method = atom({
  key: 'method',
  default: getSessionItem('shape', '').split(','),
});

export const fuel = atom({
  key: 'fuel',
  default: getSessionItem('shape', '').split(','),
});

export const cost = atom({
  key: 'cost',
  default: getSessionItemToNum('shape', '0,9'),
});

export const displacement = atom({
  key: 'displacement',
  default: getSessionItemToNum('shape', '0,5'),
});

export const fuelEfficiency = atom({
  key: 'fuelEfficiency',
  default: getSessionItemToNum('shape', '0,5'),
});

export const name = atom({
  key: 'name',
  default: getSessionItem('shape', '').split(','),
});

export const conditions = atom({
  key: 'conditions',
  default: getConditions(),
});
