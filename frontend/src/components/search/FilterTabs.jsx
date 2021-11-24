import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';
import CarList from './CarList';
import { getCarListSorted } from '../../apis/seachAPI';

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

const FilterTabs = () => {
  const [currPage, setCurrPage] = useState('1');
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    const filterList = { 0: '출시일순', 1: '가격순', 2: '연비순' };
    getCarListSorted(filterList[filter], currPage).then(({ data }) => {
      const total = data[0].result_num;
      const cars = data[1];
      setDataLength(total);
      setItems(cars);
    });
  }, [filter, currPage]);

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter);
  };

  const handlePageChange = (_, page) => {
    setCurrPage(page);
  };

  return (
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
          <Tab label="낮은가격순" {...a11yProps(1)} />
          <Tab label="높은연비순" {...a11yProps(2)} />
        </Tabs>
        <span>총 {dataLength} 건</span>
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
        count={20}
        shape="rounded"
        onChange={handlePageChange}
        // getItemAriaLabel={(e) => console.log('get', e)}
      />
    </Box>
  );
};

export default FilterTabs;
