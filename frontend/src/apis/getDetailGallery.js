import axios from 'axios';

const PATH = process.env.REACT_APP_BACKEND_URL;

const getDetailGallery = async (carId, page_num) => {
  const response = await axios.get(`${PATH}/api/detail/gallary`, {
    params: { id: carId, num: page_num },
  });
  try {
    const resultNum = response.data.gallery_contents[0].result_num;
    const detailGalleryUrl = [];
    for (let i = 1; i <= resultNum; i++) {
      detailGalleryUrl.push(response.data.gallery_contents[i].car_url);
    }
    return { resultNum, detailGalleryUrl };
  } catch (error) {
    console.log('ERROR CHECK!', error);
  }
};

export default getDetailGallery;
