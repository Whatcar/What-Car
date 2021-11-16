import { Checkbox, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import selectList from '../../data/selectList';
import setCheckedValues from '../../utils/setCheckedValues';

const SelectCheck = ({ keyName }) => {
  const [values, setValues] = useState([]);
  const check = selectList[keyName];

  useEffect(() => {
    sessionStorage.setItem(keyName, values);
  }, [keyName, values]);

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
