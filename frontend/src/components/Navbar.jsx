import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import navWave from '../img/nav/wave_small.svg';
import verticalWave from '../img/nav/vertical-wave.svg';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Logo from '../img/nav/logo.svg';
import { resetSessionStorage } from '../utils/searchCondition';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { blue } from '../css/colors';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import conditionSelector from '../recoil/selector';
import { useRecoilState } from 'recoil';

const navInfo = [
  { id: 0, links: ['/'], link: '/', title: '사진 속 차 찾기' },
  { id: 1, links: ['/search'], link: '/search', title: '조건별 차 찾기' },
  { id: 2, links: ['/destiny', '/worldcup', '/mbti'], link: '/destiny', title: '운명의 차 찾기' },
  { id: 3, links: ['/gallary'], link: '/gallary', title: '갤러리' },
  { id: 4, links: ['/team'], link: '/team', title: '팀 소개' },
];

export default function Navbar() {
  const [sidebar, setSidebar] = useState(null);
  const [state, setState] = useRecoilState(conditionSelector);
  const showSidebar = () => {
    sidebar === null ? setSidebar(true) : sidebar === false ? setSidebar(true) : setSidebar(false);
  };
  const location = useLocation();
  const locationNow =
    location.pathname.split('/').length > 2
      ? `/${location.pathname.split('/')[1]}`
      : location.pathname; // pathname의 첫번째만 저장하도록 함
  const handleClick = () => {
    resetSessionStorage();
    setState();
  };

  return (
    <>
      <NavWrapper>
        <NavWave src={navWave} />
        <NavDiv>
          <StyledGrid container spacing={0}>
            <Grid item xs={10} md={8} lg={8}>
              <InnerDiv>
                <Link to="/">
                  <img src={Logo} />
                </Link>
                <Menus>
                  {navInfo.map((item) => (
                    <div key={item.id}>
                      <CustomLink
                        onClick={handleClick}
                        to={item.link}
                        ispage={item.links.includes(locationNow) ? 1 : undefined}
                      >
                        {item.title}
                      </CustomLink>
                    </div>
                  ))}
                </Menus>
                <HamburgerMenu>
                  <MenuRoundedIcon fontSize="large" sx={{ color: '#FFF' }} onClick={showSidebar} />
                </HamburgerMenu>
              </InnerDiv>
            </Grid>
          </StyledGrid>
        </NavDiv>
      </NavWrapper>
      <SideNav sideMenu={sidebar}>
        <SideWave src={verticalWave} />
        <NavMenu>
          <div style={{ position: 'relative', width: '100%' }}>
            <CloseRoundedIcon
              fontSize="large"
              sx={{ color: '#FFF', position: 'absolute', top: 0, right: '0px' }}
              onClick={showSidebar}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              padding: '3rem 0',
              height: '40vh',
            }}
          >
            {navInfo.map((item) => (
              <div key={`side-${item.id}`}>
                <CustomLink
                  onClick={() => {
                    handleClick();
                    setSidebar(false);
                  }}
                  to={item.link}
                  ispage={item.links.includes(locationNow) ? 1 : undefined}
                >
                  {item.title}
                </CustomLink>
              </div>
            ))}
          </div>
        </NavMenu>
      </SideNav>
      <VacantArea isShow={sidebar} onClick={showSidebar} />
    </>
  );
}

const NavWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
`;

const NavWave = styled.img`
  width: 100%;
  transform: scale(1.1);
  position: absolute;
  top: 3rem;
  left: 0;
  @media screen and (min-width: 1400px) {
    top: 2rem;
  }
`;

const NavDiv = styled.div`
  height: 7vh;
  min-height: 3.1rem;
  max-height: 5rem;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: ${({ theme }) => theme.colors.blueM};
`;

const StyledGrid = styled(Grid)`
  padding-top: 0.7rem;
  justify-content: center;
`;

const InnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menus = styled.div`
  display: flex;
  div {
    margin-left: 1rem;
    flex-grow: 1;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  @media screen and (max-width: 480px) {
    display: block;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.ispage ? 'white' : 'rgba(255,255,255,0.5)')};
  font-family: 'SBAggroM';
  &:hover {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.5s ease;
    cursor: pointer;
  }
`;

const SideNav = styled.div`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 101;
  transition: all 0.5s ease;
  display: ${(props) => (props.sideMenu === null || false ? 'none' : 'flex')};
  ${(props) =>
    props.sideMenu !== null &&
    css`
      animation: 0.7s ${(props) => (props.sideMenu ? 'showUp' : 'showOut')} forwards;
    `}

  @keyframes showUp {
    0% {
      transform: translate(150%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes showOut {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(150%, 0);
      display: none;
    }
  }
`;

const SideWave = styled.img`
  display: block;
  position: fixed;
  top: 0;
  height: 100vh;
  right: 150px;
  -webkit-filter: drop-shadow(-2px 0px 7px rgba(0, 0, 0, 0.4));
  filter: drop-shadow(-2px 0px 7px rgba(0, 0, 0, 0.4));
`;

const NavMenu = styled.div`
  background-color: ${({ theme }) => theme.colors.blueM};
  width: 200px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  padding: 1rem 2rem;
  box-sizing: border-box;
`;

const VacantArea = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
  pointer-events: ${(props) => (props.isShow ? '' : 'none')};
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  touch-action: ${(props) => (props.isShow ? 'none' : '')};
  transition: opacity 0.6s ease-in-out;
`;
