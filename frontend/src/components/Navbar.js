import React, {useState} from 'react';
import styled from 'styled-components';
import navWave from '../img/wave_small.svg';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {Button, Menu, MenuItem} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { blue } from '@mui/material/colors'

const navInfo = [
    {id: 0, link:'/', title: '사진 속 차 찾기'},
    {id: 1, link:'/search', title: '자동차 검색'},
    {id: 2, link:'/worldcup', title: '이상형 월드컵'},
    {id: 3, link:'/mbti', title: 'MBTI'},
    {id: 4, link:'/team', title: '팀 소개'}
]

export default function Navbar() {
    const location = useLocation();
    const locationNow = location.pathname.split('/').length > 1 ? `/${location.pathname.split('/')[1]}` : location.pathname     // pathname의 첫번째만 저장하도록 함

    return (
        <NavWrapper>
            <NavWave src={navWave} />
            <NavDiv>
                <StyledGrid container spacing={0}>
                    <Grid item xs={10} md={8} lg={8}>
                        <InnerDiv>
                            <CustomLink to='/'>Logo</CustomLink>
                            <Menus>
                                {navInfo.map(item => <div key={item.id}><CustomLink to={item.link} ispage={locationNow==item.link ? 1:undefined}>{item.title}</CustomLink></div>
                                )}
                            </Menus>
                        </InnerDiv>
                    </Grid>
                </StyledGrid>
            </NavDiv>
        </NavWrapper>
    )
}

const NavWrapper = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
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
    background-color: #2195F2;
`;

const StyledGrid = styled(Grid)`
    padding-top: 1rem;
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

`;

const CustomLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.ispage ? 'white': 'rgba(255,255,255,0.5)'};
        &:hover {
            color: rgba(255,255,255,0.8);
            transition: color 0.5s ease;
            cursor: pointer;
        }
`;
