import axios from 'axios';

const PATH = process.env.REACT_APP_BACKEND_URL;

const getSearchDetail = async (carId) => {
  const response = await axios.get(`${PATH}/api/detail`, { params: { id: carId } });
  try {
    const carData = response.data[0];
    const names = response.data[1].color_name;
    const urls = response.data[1].color_url;
    const carColor = names.map((name, idx) => {
      return {
        name,
        url: urls[idx],
      };
    });
    return { carData, carColor };
  } catch (error) {
    console.log('ERROR CHECK!', error);
  }
};

export default getSearchDetail;
