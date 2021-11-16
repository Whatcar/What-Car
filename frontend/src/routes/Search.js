import React from 'react';
import styled from 'styled-components';

import SelectBox from '../components/search/SelectBox';
import { maintitle } from '../css/fonts';

const Search = () => {
  const handleSearchClick = () => {};

  const handleResetClick = () => {};

  return (
    <ContentBox>
      <Title>어떤 차가 궁금하신가요?</Title>
      <SelectBox clickSubmit={handleSearchClick} />
      <button>조건 검색</button>
      <button>초기화</button>
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
