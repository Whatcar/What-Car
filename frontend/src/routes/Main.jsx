import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Intro from '../components/main/Intro.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Pagination } from 'swiper';
import Section0 from '../components/main/Section0.jsx';
import Section1 from '../components/main/Section1.jsx';
import Section2 from '../components/main/Section2.jsx';
import Section3 from '../components/main/Section3.jsx';
import Section4 from '../components/main/Section4.jsx';
import pic2 from '../img/main/2_2.svg';
import pic3 from '../img/main/3_1.svg';
import { colors } from '../css/theme.js';

const slideStyle = { width: '100%', display: 'flex', alignItems: 'center', position: 'relative' };

export default function Main() {
  SwiperCore.use([Mousewheel, Pagination]);
  const [swiper, setSwiper] = useState();
  return (
    <MainWrapper>
      <StyledSwiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide style={{ display: 'flex', alignItems: 'center' }}>
          <MainLayout>
            <Intro />
          </MainLayout>
        </SwiperSlide>
        <SwiperSlide
          style={{
            ...slideStyle,
            backgroundColor: colors.blueBG,
          }}
        >
          <MainLayout>
            <Section0 />
          </MainLayout>
        </SwiperSlide>

        <SwiperSlide style={slideStyle}>
          <MainLayout>
            <Section1 swiper={swiper} />
          </MainLayout>
        </SwiperSlide>
        <SwiperSlide style={slideStyle}>
          <ImgWrapper src={pic2} />
          <MainLayout>
            <Section2 />
          </MainLayout>
        </SwiperSlide>
        <SwiperSlide
          style={{
            ...slideStyle,
            backgroundColor: colors.blueBG,
          }}
        >
          <MainLayout>
            <Section3 />
          </MainLayout>
          <img
            src={pic3}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, 0%)',
            }}
            alt="메인 서브 이미지"
          />
        </SwiperSlide>
        <SwiperSlide style={slideStyle}>
          <MainLayout>
            <Section4 swiper={swiper} />
          </MainLayout>
        </SwiperSlide>
      </StyledSwiper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainLayout = styled.div`
  width: 66%;
  margin: auto;

  @media screen and (max-width: 480px) {
    width: 85%;
  }
`;

const ImgWrapper = styled.img`
  height: 100%;
  margin-right: 2rem;
  position: absolute;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const StyledButton = styled(Button)({
  width: '300px',
});

const StyledSwiper = styled(Swiper)`
  height: 100vh;
  width: 100vw;
`;
