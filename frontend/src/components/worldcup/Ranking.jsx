import styled from 'styled-components';
import { MainDesc } from '../../css/mainStyles';
import { useNavigate } from 'react-router';

export default function Ranking({ ranking }) {
  const navigate = useNavigate();
  const handleClick = (carId) => {
    navigate(`/search/detail/${carId}`);
  };
  return (
    <RankingWrapper>
      {ranking.map((item) => (
        <RankingStacks key={`${item.name}-car`}>
          <img
            src={item.photolink}
            onClick={() => handleClick(item.car_id)}
            alt="차량 사진"
            style={{ width: '90%' }}
          />
          <RankingStack
            onClick={() => handleClick(item.car_id)}
            heightRatio={item.rank === 1 ? 1 : item.rank === 2 ? 2 / 3 : 1 / 2}
          >
            <MainDesc>
              {item.rank}등 ({item.rate}%)
            </MainDesc>
            <br />
            {item.name}
          </RankingStack>
        </RankingStacks>
      ))}
    </RankingWrapper>
  );
}

const RankingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: space-around;
  & :nth-child(2) {
    order: -1;
  }
`;

const RankingStacks = styled.div`
  width: 100%;
  margin: 1rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  img {
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
    margin: 0.5rem;
  }
`;

const RankingStack = styled.div`
  width: 100%;
  height: ${(props) => `${props.heightRatio * 300}px`};
  transition: all 0.5s ease;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${({ theme }) => theme.colors.blueM};
  text-align: center;
  color: white;
  padding-top: 2rem;
  box-sizing: border-box;
  cursor: pointer;
  overflow-y: scroll;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueD};
  }
  @media screen and (max-width: 480px) {
    padding-top: 1rem;
    h3 {
      font-size: 1.2rem;
    }
  }
`;
