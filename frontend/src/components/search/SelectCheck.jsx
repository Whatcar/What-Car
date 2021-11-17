import { Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';
import selectList from '../../data/selectList';
import isChecked from '../../utils/isChecked';
import { parseSessionArray, setCheckedValues } from '../../utils/searchCondition';

const SelectCheck = ({ keyName }) => {
  const nowValues = parseSessionArray(keyName);
  const check = selectList[keyName];

  const handleClick = (e) => {
    const newValue = e.target.value;
    setCheckedValues(newValue, keyName);
  };

  const checkList = check.map((item) => {
    return (
      <FormControlLabel
        key={item}
        control={
          <Checkbox
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
