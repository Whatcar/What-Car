import axios from 'axios';

const apiPath = 'https://6191b2cf41928b0017690111.mockapi.io/search';

export const getCarList = async () => {
  const response = await axios.get(`${apiPath}`);
  return response;
};

export default getCarList;
