import axios from 'axios';
const PATH = process.env.REACT_APP_BACKEND_URL;

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
