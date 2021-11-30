import styled from 'styled-components';
import selectList from '../../data/selectList';
import { setCheckedValuesArray } from '../../utils/searchCondition';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getSessionItem } from '../../utils/searchCondition';
import { useEffect } from 'react';

const ConditionButtons = ({ condition }) => {
  const [values, setValues] = useRecoilState(atom[condition]);

  useEffect(() => {
    console.log('button', values);
  }, []);

  const conditions = selectList[condition];
  const buttonList = conditions.map((item) => {
    const handleClick = (e) => {
      const newValue = e.target.value;
      const newValues = setCheckedValuesArray(newValue, values);
      setValues(newValues);
    };

    return (
      <Label key={item} htmlFor={item} checked={values.includes(item)}>
        {item}
        <input
          id={item}
          type="checkbox"
          value={item}
          defaultChecked={false}
          onClick={handleClick}
          style={{ display: 'none' }}
        />
      </Label>
    );
  });

  return (
    <Accordion key={condition} style={{ width: '100%' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {condition}
        description
      </AccordionSummary>
      <AccordionDetails>
        <Box>{buttonList}</Box>
      </AccordionDetails>
    </Accordion>
  );
};

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  row-gap: 0.25rem;
  border: 1px solid black;
  text-align: center;
  color: ${({ checked }) => (checked ? 'blue' : 'red')};
  ${({ theme }) => theme.fontStyle.body}
`;

export default ConditionButtons;
