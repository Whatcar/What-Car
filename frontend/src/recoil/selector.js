import { selector } from 'recoil';
import {
  range,
  brand,
  grade,
  shape,
  method,
  fuel,
  displacement,
  fuelEfficiency,
  cost,
  name,
} from './atom';

const parseCondition = (keyName, condition) => {
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
  const startIdx = Number(condition[0]);
  const endIdx = Number(condition[1]);
  const start = label[startIdx];
  const end = label[endIdx];
  if (keyName === 'cost' && startIdx === 0 && endIdx === 9) {
    return '전체~';
  } else if (keyName !== 'cost' && startIdx === 0 && endIdx === 5) {
    return '전체~';
  }
  return `${start}~${end}`;
};

export const eachConditionSelector = selector({
  key: 'eachConditionSelector',
  get: ({ get }) => {
    const conditions = get(brand).concat(
      get(grade),
      get(shape),
      get(method),
      get(fuel),
      parseCondition('displacement', get(displacement)),
      parseCondition('fuelEfficiency', get(fuelEfficiency)),
      parseCondition('cost', get(cost)),
      get(name),
    );
    return conditions;
  },
});

const conditionSelector = selector({
  key: 'conditionSelector',
  get: ({ get }) => {
    const conditions = {
      range: get(range),
      brand: get(brand),
      grade: get(grade),
      shape: get(shape),
      method: get(method),
      fuel: get(fuel),
      displacement: get(displacement),
      fuelEfficiency: get(fuelEfficiency),
      cost: get(cost),
      name: get(name),
    };
    return conditions;
  },
  set: ({ set }) => {
    set(range, '전체');
    set(brand, []);
    set(grade, []);
    set(shape, []);
    set(method, []);
    set(fuel, []);
    set(displacement, [0, 5]);
    set(fuelEfficiency, [0, 5]);
    set(cost, [0, 9]);
    set(name, '');
  },
});

export default conditionSelector;
