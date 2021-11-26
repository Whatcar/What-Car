import styled from 'styled-components';
import { FormControl, MenuItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import selectList from '../../data/selectList';
import MySelect from '../../css/MySelect';
import { getSessionItem } from '../../utils/searchCondition';

const SelectOne = ({ keyName, setSelected }) => {
  const nowValue = getSessionItem(keyName, '전체');
  const [value, setValue] = useState(nowValue);
  const select = selectList[keyName];

  useEffect(() => {
    sessionStorage.setItem(keyName, value);
    setSelected && setSelected(keyName, value);
  }, [keyName, value]);

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
          MenuProps={{
            style: {
              height: 204,
            },
          }}
        >
          {selectOneList}
        </MySelect>
      </FormControl>
    </Box>
  );
};

export default SelectOne;

const Box = styled.div``;
