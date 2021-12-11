import axios from 'axios';

const PATH = process.env.REACT_APP_BACKEND_URL;

const getDetailGallery = async (carId, page_num, ai_result_id) => {
  const response = await axios.get(`${PATH}/api/detail/gallary`, {
    params: { id: carId, num: page_num, ai_result_id: ai_result_id },
  });
  try {
    const resultNum = response.data.gallery_contents[0].result_num;
    const detailGalleryUrl = [];
    for (let i = 1; i <= resultNum; i++) {
      detailGalleryUrl.push(response.data.gallery_contents[i].car_url);
    }
    const galleryId = [];
    for (let i = 1; i <= resultNum; i++) {
      galleryId.push(response.data.gallery_contents[i].ai_result_id);
    }
    return { resultNum, detailGalleryUrl, galleryId };
  } catch (error) {
    console.log('ERROR CHECK!', error);
  }
};

export default getDetailGallery;
