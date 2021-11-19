import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const getCarList = async (api) => {
  const response = await axios.get(api);
  return response;
};
