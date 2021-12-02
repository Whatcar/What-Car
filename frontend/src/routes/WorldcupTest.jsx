import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

export default function WorldcupTest() {
  const navigate = useNavigate();
  const [worldcupData, setWorldcupData] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [gameNum, setGameNum] = useState(32);
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
    axios.get('http://localhost:5000/api/select/worldcup').then((res) => {
      setWorldcupData(res.data);
      setDisplays([res.data[0], res.data[1]]);
    });
  }, []);

  const clickHandler = (item) => {
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
    <WorldcupWrapper>
      <p>
        {gameNum}
        {gameNum >= 4 && '강'}전
      </p>
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
    </WorldcupWrapper>
  );
}

const WorldcupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 80vh;
`;

const ImgWrapper = styled.div`
  flex-grow: 1;
  img {
    width: 200px;
  }
`;
