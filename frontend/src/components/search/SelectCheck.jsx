import { Checkbox, FormControlLabel } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import setCheckedValues from '../../utils/setCheckedValues';

const SelectCheck = ({ check, setChecked }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setChecked(values);
  });

  const handleClick = (e) => {
    const newValue = e.target.value;
    setCheckedValues(newValue, values, setValues);
  };

  const checkList = check.map((shape) => {
    return (
      <FormControlLabel
        key={shape}
        control={<Checkbox value={shape} defaultChecked={false} onClick={handleClick} />}
        label={shape}
      />
    );
  });

  return <Box>{checkList}</Box>;
};

export default SelectCheck;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 4px;
`;
