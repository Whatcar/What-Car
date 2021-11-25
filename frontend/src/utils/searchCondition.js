export const parseSessionArray = (keyName) => {
  return sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName).split(',') : [];
};

export const getSessionItem = (keyName, initial) => {
  const item = sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : initial;
  return item;
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

export const resetSessionStorage = () => {
  const resetList = {
    range: '전체',
    brand: '',
    cost: '전체~',
    displacement: '전체~',
    fuelEfficiency: '전체~',
    grade: '',
    shape: '',
    name: '',
    method: '',
    fuel: '',
  };
  Object.keys(resetList).forEach((keyName) => sessionStorage.setItem(keyName, resetList[keyName]));
};
