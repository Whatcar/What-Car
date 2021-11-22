import styled from 'styled-components';
import { FormControl, Select, MenuItem } from '@mui/material';
import { useCallback, useState } from 'react';
import selectList from '../../data/selectList';
import MySelect from '../../css/MySelect';

const SelectOne = ({ keyName }) => {
  const nowValue = sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : '전체';
  const [value, setValue] = useState(nowValue);
  const select = selectList[keyName];

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.innerText;
      sessionStorage.setItem(keyName, newValue);
      setValue(newValue);
    },
    [keyName],
  );

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
        <MySelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          displayEmpty
          onClick={handleChange}
        >
          {selectOneList}
        </MySelect>
      </FormControl>
    </Box>
  );
};

export default SelectOne;

const Box = styled.div``;
