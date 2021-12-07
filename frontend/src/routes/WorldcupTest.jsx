import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { MainTitle } from '../css/mainStyles';
import Layout from '../components/Layout';
import { LinearProgress } from '@mui/material';
import { colors } from '../css/theme';

export default function WorldcupTest() {
  const navigate = useNavigate();
  const [worldcupData, setWorldcupData] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [gameNum, setGameNum] = useState(32);
  const [progress, setProgress] = useState(0);
  const sendAndGoToResult = (worldcupResult) => {
    axios
      .patch('http://localhost:5000/api/worldcup/result', null, {
        params: {
          id: worldcupResult,
        },
      })
      .then((res) => {
        if (res.status === 200) navigate(`/worldcup/result/${worldcupResult}`);
      });
  };
  useEffect(() => {
    axios.get('http://localhost:5000/api/select/random/cars').then((res) => {
      setWorldcupData(res.data);
      setDisplays([res.data[0], res.data[1]]);
    });
  }, []);

  const clickHandler = (item) => {
    setProgress((curr) => curr + 3.2);
    if (worldcupData.length <= 2) {
      if (winners.length === 0) {
        sendAndGoToResult(item.car_id);
      } else {
        setGameNum(gameNum >= 16 ? gameNum / 2 : gameNum === 8 ? '준결승' : '결승');
        let updatedWorldcup = [...winners, item];
        setWorldcupData(updatedWorldcup);
        setDisplays([updatedWorldcup[0], updatedWorldcup[1]]);
        setWinners([]);
      }
    } else {
      setWinners([...winners, item]);
      setDisplays([worldcupData[2], worldcupData[3]]);
      setWorldcupData(worldcupData.slice(2));
    }
  };

  return (
    <Layout>
      <LinearProgress variant="determinate" color="primary" value={progress} />
      <MainTitle style={{ margin: '0.5rem 0', color: colors.blueM }}>
        {gameNum}
        {gameNum >= 4 && '강'}전
      </MainTitle>
      <WorldcupWrapper>
        <Images>
          {displays.map((d) => (
            <ImgWrapper
              key={`worldcup-${d.car_id}`}
              onClick={() => {
                console.log(d);
                clickHandler(d);
              }}
            >
              <img src={d.photolink} alt="차량 사진" />
            </ImgWrapper>
          ))}
        </Images>
      </WorldcupWrapper>
    </Layout>
  );
}

const WorldcupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 80vh;
  flex-direction: column;
  justify-content: top;
  text-align: center;
`;

const Images = styled.div`
  display: flex;
  column-gap: 1rem;
  width: 100%;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    row-gap: 1rem;
  }
`;

const ImgWrapper = styled.div`
  width: 50%;
  padding: 2rem;
  border: 2px solid ${({ theme }) => theme.colors.black300};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.5s ease;
  @media screen and (max-width: 480px) {
    width: 100%;
    min-height: 100px;
    box-sizing: border-box;
  }

  img {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }
`;
