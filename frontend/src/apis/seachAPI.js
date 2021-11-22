import axios from 'axios';

const PATH = 'http://localhost:5000/';

const carList = `${PATH}/api/car/list`;
const search = `${PATH}/api/search`;
const carListSorted = `${PATH}/api/car/list/sorted`;

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const getCarList = async () => {
  const response = await axios.get(carList);
  return response;
};

export const getCarListSorted = async (filter) => {
  const response = await axios.get(carListSorted, {
    params: {
      sort_criteria: filter,
    },
  });
  return response;
};

export const getSearchCarList = async (conditions) => {
  const response = await axios.get(search, {
    params: {
      conditions,
    },
  });
  return response;
};
