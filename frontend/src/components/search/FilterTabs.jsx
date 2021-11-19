import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';
import CarList from './CarList';

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
  const [currURL, setCurrURL] = useState('https://6191b2cf41928b0017690111.mockapi.io/search');

  const [value, setValue] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (_, page) => {
    setCurrPage(page);
    console.log(page);
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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="최신순" {...a11yProps(0)} />
          <Tab label="가격순↓" {...a11yProps(1)} />
          <Tab label="연비순↓" {...a11yProps(2)} />
        </Tabs>
        <span>총 {dataLength} 건</span>
      </Box>
      <TabPanel value={value} index={0}>
        <CarList api={currURL} filter="recent" setDataLength={setDataLength} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CarList api={currURL} filter="cost" setDataLength={setDataLength} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CarList api={currURL} filter="fuelEfficiency" setDataLength={setDataLength} />
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
