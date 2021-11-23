import { useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';
import selectList from '../../data/selectList';
import isChecked from '../../utils/isChecked';
import { getSessionItem, setCheckedValues } from '../../utils/searchCondition';

const SelectCheck = ({ keyName }) => {
  const nowValues = getSessionItem(keyName, '').split(',');
  const check = selectList[keyName];

  useEffect(() => {
    sessionStorage.setItem(keyName, nowValues);
  }, [keyName]);

  const handleClick = (e) => {
    const newValue = e.target.value;
    setCheckedValues(newValue, keyName);
  };

  const checkList = check.map((item) => {
    return (
      <FormControlLabel
        sx={labelStyle}
        key={item}
        control={
          <Checkbox
            sx={{
              padding: 0,
              '&.Mui-checked': {
                color: '#2195F2',
              },
            }}
            value={item}
            defaultChecked={isChecked(item, nowValues)}
            onClick={handleClick}
          />
        }
        label={item}
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

const labelStyle = {
  margin: '0.25rem 0',
};

const checkboxStyle = {
  padding: '0',
};
