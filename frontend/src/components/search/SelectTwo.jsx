import styled from 'styled-components';
import { FormControl, Select, MenuItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import selectList from '../../data/selectList';

const SelectTwo = ({ keyName }) => {
  const nowValue = sessionStorage.getItem(keyName)
    ? sessionStorage.getItem(keyName).split('~')
    : ['전체', ''];
  const [start, setStart] = useState(nowValue[0]);
  const [end, setEnd] = useState(nowValue[1]);
  const select = selectList[keyName];

  useEffect(() => {
    const keyValue = `${start}~${end}`;
    sessionStorage.setItem(keyName, keyValue);
  }, [keyName, start, end]);

  const startIdx = select.findIndex((item) => item === start);
  const endList = select.slice(startIdx + 1);

  const handleStartChange = useCallback(
    (e) => {
      const newStart = e.target.value;
      let newEnd = end;
      const newStartIdx = select.findIndex((item) => item === newStart);
      const endIdx = select.findIndex((item) => item === end);
      if (newStartIdx === select.length - 1 || newStart === '전체') {
        newEnd = '';
      } else if (newStartIdx >= endIdx) {
        newEnd = select[newStartIdx + 1];
      }
      setStart(newStart);
      setEnd(newEnd);
      sessionStorage.setItem(keyName, [start, end]);
    },
    [keyName, start, end, select],
  );

  const handleEndChange = useCallback((e) => {
    setEnd(e.target.value);
  }, []);

  const selectStart = select.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  const selectEnd = endList.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  return (
    <Box>
      <FormControl sx={{ width: '45%' }}>
        <Select
          labelId="select-start-label"
          id="select-start-label"
          value={start}
          displayEmpty
          onChange={handleStartChange}
        >
          {selectStart}
        </Select>
      </FormControl>
      ~
      <FormControl sx={{ width: '45%' }} disabled={start === '전체' ? true : false}>
        <Select
          labelId="select-end-label"
          id="select-end-label"
          value={end}
          displayEmpty
          onChange={handleEndChange}
        >
          {selectEnd}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectTwo;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 12px;
`;
