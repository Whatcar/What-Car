export const getSessionItem = (keyName, initial) => {
  const item = sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : initial;
  return item;
};

const parseCondition = (keyName, condition) => {
  const Idx = condition.split(',');
  const beforeLabel = {
    cost: [
      '0원',
      '1,000만원',
      '2,000만원',
      '3,000만원',
      '4,000만원',
      '7,000만원',
      '1억원',
      '2억원',
      '5억원',
      '',
    ],
    displacement: ['1cc', '1,000cc', '1,600cc', '2,000cc', '3,000cc', ''],
    fuelEfficiency: ['1km/l', '5km/l', '10km/l', '15km/l', '20km/l', '25km/l', ''],
  };

  const label = beforeLabel[keyName];
  const startIdx = Number(Idx[0]);
  const endIdx = Number(Idx[1]);
  const start = label[startIdx];
  const end = label[endIdx];
  if (keyName === 'cost' && startIdx === 0 && endIdx === 9) {
    return '전체~';
  } else if (startIdx === 0 && endIdx === 5) {
    return '전체~';
  }
  return `${start}~${end}`;
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
    if (['cost', 'displacement', 'fuelEfficiency'].includes(keyName)) {
      const condition = sessionStorage.getItem(keyName);
      conditions[keyName] = parseCondition(keyName, condition);
    } else if (keyName === 'method') {
      const condition = sessionStorage.getItem(keyName);
      const conditionLength = condition ? condition.split(',') : [];
      if (!condition && conditionLength.length < 6) {
        conditions[keyName] = condition;
      } else {
        conditions[keyName] = '전체';
      }
    } else if (keyName === 'fuel') {
      const condition = sessionStorage.getItem(keyName);
      const conditionLength = condition.split(',');
      if (!condition && conditionLength.length < 9) {
        conditions[keyName] = condition;
      } else {
        conditions[keyName] = '전체';
      }
    } else {
      conditions[keyName] = sessionStorage.getItem(keyName);
    }
  });
  return conditions;
};

export const setCheckedValuesArray = (newValue, values) => {
  const newValueIdx = values.findIndex((item) => item === newValue);
  let newValues = values.slice();
  if (newValueIdx === -1) {
    newValues.push(newValue);
  } else {
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
