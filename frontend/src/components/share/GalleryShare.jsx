import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SubTitle } from '../../css/mainStyles';
import getDetailGallery from '../../apis/getDetailGallery';
import styled from 'styled-components';
import gallery from '../../img/notfound/gallery.png';
import { useNavigate } from 'react-router';

export default function GalleryShare({ carId }) {
  const num = 1;
  const [resultNum, setResultNum] = useState();
  const [detailGalleryUrl, setDetailGalleryUrl] = useState([]);
  const [galleryId, setGalleryId] = useState();

  useEffect(() => {
    const getDetailGalleryInfo = async (carId, num) => {
      const { resultNum, detailGalleryUrl, galleryId } = await getDetailGallery(carId, num);
      setResultNum(resultNum);
      setDetailGalleryUrl(detailGalleryUrl);
      setGalleryId(galleryId);
    };
    if (carId) getDetailGalleryInfo(carId, num);
  }, [carId, num]);

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const navigate = useNavigate();

  const urlList = detailGalleryUrl.map((url, idx) => (
    <SlideImg
      key={`gallery-sample-${carId}-${idx}`}
      src={url}
      num={resultNum}
      onClick={() => {
        navigate(`/result/${galleryId[idx]}`);
      }}
    />
  ));

  return (
    <div className="container">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <style>{cssstyle}</style>
      <SubTitle> 다른 사람들이 공유한 검색 결과에요 </SubTitle>
      <Slider {...settings}>
        {urlList}
        {resultNum < 2 && <SlideImg src={gallery} />}
      </Slider>
    </div>
  );
}

const SlideImg = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  padding: 0.5rem 2%;
  box-sizing: border-box;
  @media screen and (max-width: 480px) {
    height: 100px;
  }
  cursor: pointer;
`;

const cssstyle = `
.container {
  margin: 3rem auto;
  padding-bottom: 21px;
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
