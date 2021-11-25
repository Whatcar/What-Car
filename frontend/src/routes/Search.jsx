import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Grid, Tabs, Tab, Box, Pagination } from '@mui/material';
import SelectBox from '../components/search/SelectBox';
import { maintitle } from '../css/fonts';
import { resetSessionStorage } from '../utils/searchCondition';
import { getSearchCarList, getCarListSorted } from '../apis/seachAPI';
import CarList from '../components/search/CarList';
import SelectAccordion from '../components/search/SelectAccordion';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const getConditions = () => {
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
  const conditions = {};

  conditionsName.forEach((keyName) => {
    conditions[keyName] = sessionStorage.getItem(keyName);
  });

  return conditions;
};

const Search = () => {
  const [conditions, setConditions] = useState(getConditions());
  const [currPage, setCurrPage] = useState('1');
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    const filterList = { 0: '출시일순', 1: '가격순', 2: '연비순' };
    getSearchCarList(conditions, currPage, filterList[filter])
      .then(({ data }) => {
        const total = data[0].result_num;
        const cars = data[1];
        setDataLength(total);
        setItems(cars);
      })
      .catch((error) => {
        setItems('no result');
      });
  }, [filter, currPage, conditions]);

  const pageCount = (dataLength) => {
    const pages = Math.ceil(dataLength / 16);
    return pages;
  };

  const handleSearchClick = (e) => {
    setConditions(getConditions());
    console.log(getConditions());
  };

  const handleResetClick = () => {
    resetSessionStorage();
    setConditions(getConditions());
    window.location.reload();
  };

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter);
  };

  const handlePageChange = (_, page) => {
    setCurrPage(page);
  };

  return (
    <ContentBox>
      <Title>어떤 차가 궁금하신가요?</Title>
      <SelectBox />
      <SelectAccordion />
      <ButtonBox>
        <Grid sx={{ marginBottom: '3rem' }} container spacing={1} columns={8}>
          <Grid item xs={2} style={{ width: '100%' }} />
          <Grid item xs={2} style={{ width: '100%' }}>
            <Button
              sx={buttonStyle}
              variant="contained"
              disableElevation
              onClick={handleSearchClick}
            >
              조건 검색
            </Button>
          </Grid>
          <Grid item xs={2} style={{ width: '100%' }}>
            <Button sx={buttonStyle} variant="outlined" onClick={handleResetClick}>
              초기화
            </Button>
          </Grid>
        </Grid>
      </ButtonBox>
      <ButtonBoxHidden>
        <Grid sx={{ marginBottom: '3rem' }} container spacing={1} columns={8}>
          <Grid item xs={4} style={{ width: '100%' }}>
            <Button
              sx={buttonStyle}
              variant="contained"
              disableElevation
              onClick={handleSearchClick}
            >
              조건 검색
            </Button>
          </Grid>
          <Grid item xs={4} tyle={{ width: '100%' }}>
            <Button sx={buttonStyle} variant="outlined" onClick={handleResetClick}>
              초기화
            </Button>
          </Grid>
        </Grid>
      </ButtonBoxHidden>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            width: '100%',
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Tabs value={filter} onChange={handleFilterChange} aria-label="basic tabs example">
            <Tab label="최신순" {...a11yProps(0)} />
            <Tab label="낮은 가격순" {...a11yProps(1)} />
            <Tab label="높은 연비순" {...a11yProps(2)} />
          </Tabs>
          <TotalNum>
            총 <span style={{ fontSize: 16 }}>{dataLength}</span> 건
          </TotalNum>
        </Box>
        <TabPanel value={filter} index={0}>
          <CarList items={items} />
        </TabPanel>
        <TabPanel value={filter} index={1}>
          <CarList items={items} />
        </TabPanel>
        <TabPanel value={filter} index={2}>
          <CarList items={items} />
        </TabPanel>
        <Pagination
          sx={{ alignSelf: 'center' }}
          boundaryCount={1}
          siblingCount={2}
          color="primary"
          count={pageCount(dataLength)}
          shape="rounded"
          onChange={handlePageChange}
          // getItemAriaLabel={(e) => console.log('get', e)}
        />
      </Box>
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

const TotalNum = styled.span`
  font-size: ${({ theme }) => theme.fontSize.S};
  span {
    font-size: ${({ theme }) => theme.fontSize.M};
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const ButtonBoxHidden = styled.div`
  display: none;
  width: 100%;
  @media screen and (max-width: 900px) {
    display: block;
  }
`;
