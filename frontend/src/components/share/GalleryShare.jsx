import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SubTitle } from '../../css/mainStyles';
import axios from 'axios';
import { useParams } from 'react-router';
import getDetailGallery from '../../apis/getDetailGallery ';
import getSearchDetail from '../../apis/getSearchDetail';

export default function GalleryShare() {
  const params = useParams();
  const carId = params.id;
  const num = 1;
  const [resultNum, setResultNum] = useState();
  const [detailGalleryUrl, setDetailGalleryUrl] = useState([]);

  useEffect(() => {
    const getDetailGalleryInfo = async (carId, num) => {
      const { resultNum, detailGalleryUrl } = await getDetailGallery(carId, num);
      setResultNum(resultNum);
      setDetailGalleryUrl(detailGalleryUrl);
    };
    getDetailGalleryInfo(carId, num);
  }, [carId, num]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  console.log(detailGalleryUrl);

  const urlList = detailGalleryUrl.map((url) => (
    <div>
      <img src={url} />
    </div>
  ));

  return (
    <div className="container">
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <style>{cssstyle}</style>
      <SubTitle> 다른 사람들이 공유한 검색 결과에요 </SubTitle>
      <Slider {...settings}>{urlList}</Slider>
    </div>
  );
}

const cssstyle = `
.container {
  margin: 0 auto;
  padding: 40px 40px 40px 40px;
  width: 100%;
  
}
h4 {
    background: #2195F2;
    color: #E0E0E0;
    font-size: 36px;
    line-height: 180px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
`;
