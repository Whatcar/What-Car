import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tabs, Tab, Box, Pagination } from '@mui/material';
import SelectBox from '../components/search/SelectBox';
import { getSearchCarList } from '../apis/searchAPI';
import CarList from '../components/search/CarList';
import { getConditions } from '../utils/searchCondition';
import Layout from '../components/Layout';
import SearchButton from '../components/search/SearchButton';

const filterList = ['최신순', '낮은 가격순', '높은 연비순'];

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

const Search = () => {
  const [currPage, setCurrPage] = useState('1');
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const [conditions, setConditions] = useState(getConditions());

  useEffect(() => {
    const filterList = { 0: '출시일순', 1: '가격순', 2: '연비순' };
    console.log('SEARCH CONDITIONS', conditions);
    getSearchCarList(conditions, currPage, filterList[filter])
      .then(({ data }) => {
        const total = data[0].result_num;
        const cars = data[1];
        setDataLength(total);
        setItems(cars);
      })
      .catch((error) => {
        console.log('ERROR CHECK!', error);
      });
  }, [filter, currPage, conditions]);

  const pageCount = (dataLength) => {
    const pages = Math.ceil(dataLength / 24);
    return pages;
  };

  const handleFilterChange = (e, newFilter) => {
    setFilter(newFilter);
  };

  const handlePageChange = (e, page) => {
    setCurrPage(page);
  };

  return (
    <Layout>
      <ContentBox>
        <Title>어떤 차가 궁금하신가요?</Title>
        <SelectBox />
        <SearchButton setConditions={setConditions} />
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
              {filterList.map((item, idx) => (
                <Tab key={item} label={item} {...a11yProps(idx)} />
              ))}
            </Tabs>
            <TotalNum>
              총 <span style={{ fontSize: 16 }}>{dataLength}</span> 건
            </TotalNum>
          </Box>
          {filterList.map((item, idx) => (
            <TabPanel key={`tap-pannel-${item}`} value={filter} index={idx}>
              <CarList items={items} />
            </TabPanel>
          ))}
          <Pagination
            sx={{ alignSelf: 'center' }}
            boundaryCount={1}
            siblingCount={2}
            color="primary"
            count={pageCount(dataLength)}
            shape="rounded"
            onChange={handlePageChange}
          />
        </Box>
      </ContentBox>
    </Layout>
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

const TotalNum = styled.span`
  font-size: ${({ theme }) => theme.fontSize.S};
  span {
    font-size: ${({ theme }) => theme.fontSize.M};
  }
`;
