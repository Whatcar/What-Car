import axios from 'axios';

const PATH = 'http://localhost:5000/';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const getCarList = async (num) => {
  const response = await axios.get(`${PATH}/api/car/list`, {
    params: {
      num: num,
    },
  });
  return response;
};

export const getCarListSorted = async (filter, num) => {
  const response = await axios.get(`${PATH}/api/car/list/sorted`, {
    params: {
      sort_criteria: filter,
      num,
    },
  });
  return response;
};

export const getSearchCarList = async (conditions, num) => {
  const response = await axios.get(`${PATH}/api/search`, {
    params: {
      ...conditions,
      num,
    },
  });
  return response;
};

export const getDetailCarInfo = async (id) => {
  const response = await axios.get(`/detail/${id}`);
  return response;
};
