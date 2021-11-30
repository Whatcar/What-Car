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
