import styled from 'styled-components';
import { FormControl, Select, MenuItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

const SelectOne = ({ select, setChecked }) => {
  const [value, setValue] = useState('전체');

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const selectList = select.map((item) => {
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
          {selectList}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectOne;

const Box = styled.div``;
