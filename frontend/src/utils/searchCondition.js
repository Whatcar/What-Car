export const parseSessionArray = (keyName) => {
  return sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName).split(',') : [];
};

export const getSessionItem = (keyName, initial) => {
  const item = sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : initial;
  return item;
};

export const getConditions = () => {
  const conditionsName = [
    'brand',
    'cost',
    'displacement',
    'fuelEfficiency',
    'grade',
    'shape',
    'name',
    'method',
    'fuel',
  ];
  const conditions = {};

  conditionsName.forEach((keyName) => {
    conditions[keyName] = sessionStorage.getItem(keyName);
  });

  return conditions;
};

export const setCheckedValues = (newValue, keyName) => {
  const values = parseSessionArray(keyName);
  const newValueIdx = values.findIndex((item) => item === newValue);
  let newValues = [];
  if (newValueIdx === -1) {
    newValues = [...values, newValue];
    sessionStorage.setItem(keyName, newValues);
  } else {
    newValues = [...values];
    newValues.splice(newValueIdx, 1);
    sessionStorage.setItem(keyName, newValues);
  }
  return newValues;
};

export const setCheckedValuesArray = (newValue, values) => {
  const newValueIdx = values.findIndex((item) => item === newValue);
  let newValues = [];
  if (newValueIdx === -1) {
    newValues = [...values, newValue];
  } else {
    newValues = [...values];
    newValues.splice(newValueIdx, 1);
  }
  return newValues;
};

export const resetSessionStorage = () => {
  const resetList = {
    range: '전체',
    brand: '',
    cost: '0,9',
    displacement: '0,5',
    fuelEfficiency: '0,5',
    grade: '',
    shape: '',
    name: '',
    method: '',
    fuel: '',
  };
  Object.keys(resetList).forEach((keyName) => sessionStorage.setItem(keyName, resetList[keyName]));
};
