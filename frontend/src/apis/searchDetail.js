const PATH = process.env.REACT_APP_BACKEND_URL;

const getSearchDetail = (carId) => {
  axios.get(`${PATH}/api/detail`, { params: { id: carId } });
};

export default getSearchDetail;
