import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@mui/material';
import FilterTabs from '../components/search/FilterTabs';
import SelectBox from '../components/search/SelectBox';
import { maintitle } from '../css/fonts';
import { resetSessionStorage } from '../utils/searchCondition';
import { getSearchCarList } from '../apis/seachAPI';

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
  const conditions = {};
  const handleSearchClick = (e) => {
    conditionsName.forEach((keyName) => {
      conditions[keyName] = sessionStorage.getItem(keyName);
    });
    getSearchCarList(conditions).then((data) => {
      console.log(data.slice(0, 16));
    });
  };

  const handleResetClick = () => {
    resetSessionStorage();
    conditionsName.forEach((keyName) => {
      conditions[keyName] = sessionStorage.getItem(keyName);
    });
    console.log(conditions);
  };

  return (
    <ContentBox>
      <Title>어떤 차가 궁금하신가요?</Title>
      <SelectBox />
      <Grid sx={{ marginBottom: '3rem' }} container spacing={1} columns={8}>
        <Grid item xs={2} columns={8} />
        <Grid item xs={2} style={{ width: '100%' }}>
          <Button sx={buttonStyle} variant="contained" disableElevation onClick={handleSearchClick}>
            조건 검색
          </Button>
        </Grid>
        <Grid item xs={2} style={{ width: '100%' }}>
          <Button sx={buttonStyle} variant="outlined" onClick={handleResetClick}>
            초기화
          </Button>
        </Grid>
      </Grid>
      <FilterTabs />
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
  ${({ theme }) => theme.fontStyle.subTitle}
  margin-bottom: 1.5rem;
`;

const buttonStyle = {
  width: '100%',
  fontSize: '1rem',
};
