import styled from 'styled-components';
import { FormControl, Select, MenuItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import selectList from '../../data/selectList';

const SelectOne = ({ keyName }) => {
  const [value, setValue] = useState('전체');
  const select = selectList[keyName];

  useEffect(() => {
    sessionStorage.setItem(keyName, value);
  }, [keyName, value]);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const selectOneList = select.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });
  return (
    <Box>
      <FormControl sx={{ width: '100%' }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          displayEmpty
          onChange={handleChange}
        >
          {selectOneList}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectOne;

const Box = styled.div``;
