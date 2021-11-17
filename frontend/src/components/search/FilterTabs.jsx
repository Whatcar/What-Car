import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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
  const [value, setValue] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
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
        <CarList filter="recent" setDataLength={setDataLength} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CarList filter="cost" setDataLength={setDataLength} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CarList filter="fuelEfficiency" setDataLength={setDataLength} />
      </TabPanel>
    </Box>
  );
};

export default FilterTabs;
