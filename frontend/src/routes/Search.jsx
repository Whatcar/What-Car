import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tabs, Tab, Box, Pagination, Divider } from '@mui/material';
import SelectBox from '../components/search/SelectBox';
import { getSearchCarList } from '../apis/searchAPI';
import CarList from '../components/search/CarList';
import { getConditions } from '../utils/searchCondition';
import Layout from '../components/Layout';
import SearchButtons from '../components/search/SearchButtons';
import { ReactComponent as QuestionIcon } from '../img/search/desc.svg';
import { colors } from '../css/theme';
import Loading from '../components/Loading';
import CustomHelmet from '../components/share/CustomHelmet';

const filterList = ['최신순', '낮은 가격순', '높은 연비순'];

const iconStyle = {
  fill: colors.black500,
  paddingRight: '4px',
};

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
  const [currPage, setCurrPage] = useState(1);
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const [conditions, setConditions] = useState(getConditions());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCarlist = async () => {
      const filterList = { 0: '출시일순', 1: '가격순', 2: '연비순' };
      setIsLoading(true);
      try {
        const carlist = await getSearchCarList(conditions, currPage, filterList[filter]);
        const total = carlist.data[0].result_num;
        const cars = carlist.data[1];
        setDataLength(total);
        setItems(cars);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getCarlist();
  }, [filter, currPage, conditions]);

  const pageCount = (dataLength) => {
    const pages = Math.ceil(dataLength / 24);
    return pages;
  };

  const handleFilterChange = (e, newFilter) => {
    setFilter(newFilter);
    setCurrPage(1);
  };

  const handlePageChange = (e, page) => {
    setCurrPage(page);
  };

  return (
    <Layout>
      <CustomHelmet title="자동차 검색하기 | 왓카" description="조건으로 자동차를 검색해봐요!" />
      <ContentBox>
        <Title>
          <span>어떤 차</span>가 궁금하신가요?
        </Title>
        <Desc>
          원하는 자동차의 사양을 선택해주세요.{' '}
          <span>아무것도 선택하지 않는 경우 ‘전체'가 적용</span>됩니다.
          <br />
          <QuestionIcon style={iconStyle} />
          아이콘 위에 커서를 올리면 해당 용어에 대한 설명을 볼 수 있습니다. 모바일의 경우{' '}
          <QuestionIcon style={iconStyle} />
          아이콘을 길게 터치해주세요.
        </Desc>
        <Divider style={{ width: '100%' }} />
        <SelectBox />
        <SearchButtons setConditions={setConditions} setCurrPage={setCurrPage} />
        <TotalNum>
          총 <span style={{ fontSize: 16 }}>{dataLength}</span> 건의 검색 결과가 있습니다
        </TotalNum>
        <Divider sx={{ width: '100%' }} />
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
          </Box>
          {isLoading && <Loading />}
          {!isLoading &&
            items &&
            filterList.map((item, idx) => (
              <TabPanel key={`tap-pannel-${item}`} value={filter} index={idx}>
                <CarList items={items} />
              </TabPanel>
            ))}
          {!!dataLength && (
            <Pagination
              sx={{ alignSelf: 'center' }}
              color="primary"
              count={pageCount(dataLength)}
              shape="rounded"
              onChange={handlePageChange}
              page={currPage}
            />
          )}
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
  ${({ theme }) => theme.fontStyle.mainTitle}
  margin-bottom: 1rem;
  text-align: center;
  span {
    color: ${({ theme }) => theme.colors.blueM};
  }
`;

const Desc = styled.p`
  ${({ theme }) => theme.fontStyle.body}
  margin-bottom: 1.2rem;
  text-align: center;
  span {
    color: ${({ theme }) => theme.colors.blueM};
    display: inline-block;
  }
`;

const TotalNum = styled.span`
  align-self: flex-start;
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.S};
  span {
    font-size: ${({ theme }) => theme.fontSize.M};
    color: ${({ theme }) => theme.colors.blueM};
  }
`;
