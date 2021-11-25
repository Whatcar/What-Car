import axios from 'axios';

const PATH = 'http://localhost:5000/';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const getSearchCarList = async (conditions, num, filter) => {
  const response = await axios.get(`${PATH}/api/search`, {
    params: {
      ...conditions,
      num,
      sort_criteria: filter,
    },
  });
  return response;
};
