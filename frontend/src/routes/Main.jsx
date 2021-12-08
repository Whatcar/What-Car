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
import section2 from '../img/main/section2.png';
import person3 from '../img/main/person3.png';
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
          <ImgWrapper src={section2} />
          <Gradient />
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
            src={person3}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, 0%)',
              height: '20vh',
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
  width: 100vw;
  object-fit: cover;
  position: absolute;
`;

const Gradient = styled.div`
  height: 100%;
  width: 100vw;
  position: absolute;
  background: linear-gradient(to left, white 50%, rgba(255, 255, 255, 0));
  @media screen and (max-width: 480px) {
    background: linear-gradient(to top, white 50%, rgba(255, 255, 255, 0));
  }
`;

const StyledButton = styled(Button)({
  width: '300px',
});

const StyledSwiper = styled(Swiper)`
  height: 100vh;
  width: 100vw;
`;
