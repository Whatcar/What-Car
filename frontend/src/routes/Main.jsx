import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

import Intro from '../components/main/Intro.jsx';

import Brands from '../components/main/Brands.jsx';
import ServiceIntro from '../components/main/ServiceIntro.jsx';
import Layout from '../components/Layout.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Pagination } from 'swiper';
import Section0 from '../components/main/Section0.jsx';
import Section1 from '../components/main/Section1.jsx';
import introData from '../data/introData.js';

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
        effect={'fade'}
        pagination={{
          clickable: true,
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
          <MainLayout>
            <Intro />
          </MainLayout>
        </SwiperSlide>
        <SwiperSlide style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
          <MainLayout>
            <Section0 />
          </MainLayout>
        </SwiperSlide>
        {introData.map((item) => (
          <SwiperSlide style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
            <MainLayout>
              <Section1
                desc={item.desc}
                moreDesc={item.moreDesc}
                buttonText={item.buttonText}
                linkTo={item.linkTo}
              />
            </MainLayout>
          </SwiperSlide>
        ))}
      </StyledSwiper>
      {/* <Brands />
      <ServiceIntro /> */}
      {/* <div style={{ textAlign: 'center' }}>
        <StyledButton
          variant="outlined"
          onClick={() => {
            swiper.slideTo(0);
            window.scrollTo(0, 0, 'smooth');
          }}
        >
          위로 올라가기
        </StyledButton>
      </div> */}
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

const StyledButton = styled(Button)({
  width: '300px',
});

const StyledSwiper = styled(Swiper)`
  height: 100vh;
  width: 100%;
`;
