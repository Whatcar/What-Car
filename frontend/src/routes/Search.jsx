import React from 'react';
import styled from 'styled-components';
import CarList from '../components/search/CarList';

import SelectBox from '../components/search/SelectBox';
import { maintitle } from '../css/fonts';

const conditionsName = [
  'brand',
  'cost',
  'displacement',
  'fuelEfficiency',
  'grade',
  'shape',
  'name',
  'method',
  'fuel',
];

const Search = () => {
  const handleSearchClick = (e) => {
    const conditions = conditionsName.map((keyName) => {
      return sessionStorage.getItem(keyName);
    });
    console.log(conditions);
  };

  const handleResetClick = () => {
    sessionStorage.clear();
    const conditions = conditionsName.map((keyName) => {
      return sessionStorage.getItem(keyName);
    });
    console.log(conditions);
  };

  return (
    <ContentBox>
      <Title>어떤 차가 궁금하신가요?</Title>
      <SelectBox />
      <button onClick={handleSearchClick}>조건 검색</button>
      <button onClick={handleResetClick}>초기화</button>
      <CarList />
    </ContentBox>
  );
};

export default Search;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  ${maintitle}
`;
