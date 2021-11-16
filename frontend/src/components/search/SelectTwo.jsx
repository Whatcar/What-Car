import styled from 'styled-components';
import { FormControl, Select, MenuItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

const SelectTwo = ({ select, setChecked }) => {
  const [start, setStart] = useState('전체');
  const [end, setEnd] = useState('');

  useEffect(() => {
    setChecked([start, end]);
  }, [start, end]);

  const startIdx = select.findIndex((item) => item === start);
  const endList = select.slice(startIdx + 1);

  const handleStartChange = useCallback(
    (e) => {
      const newStart = e.target.value;
      const newStartIdx = select.findIndex((item) => item === newStart);
      const endIdx = select.findIndex((item) => item === end);
      if (newStartIdx === select.length - 1 || newStart === '전체') {
        setEnd('');
      }
      if (newStartIdx >= endIdx) {
        setEnd(select[newStartIdx + 1]);
      }
      setStart(newStart);
    },
    [end, select],
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
