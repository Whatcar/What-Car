import React, { useState } from 'react';
import styled from 'styled-components';

export default function Ranking({ ranking }) {
  return (
    <RankingWrapper>
      {ranking.map((item) => (
        <RankingStacks key={`${item.name}-car`}>
          <RankingStack heightRatio={item.rate / ranking[0].rate}>
            {item.rank}등({item.rate}%)
            <br />
            {item.name}
            <img src={item.photolink} alt="차량 사진" style={{ width: '10rem' }} />
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
  justify-content: space-between;
`;

const RankingStacks = styled.div`
  width: 100%;
  height: 50vh;
  border: 1px solid black;
  margin: 1rem;
  display: flex;
  flex-direction: column-reverse;
`;

const RankingStack = styled.div`
  height: 0px;
  height: ${(props) => `${props.heightRatio * 100}%`};
  border: 1px solid black;
  transition: all 1s ease;
`;
