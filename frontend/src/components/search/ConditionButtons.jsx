import styled from 'styled-components';
import selectList from '../../data/selectList';
import { setCheckedValuesArray } from '../../utils/searchCondition';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import { AccordionDetails } from '@mui/material';
import { useEffect } from 'react';
import MyAccordion, { MyAccordionSummary } from '../../css/MyAccordion';
import { conditionDesc, categoryDesc } from '../../data/description';
import DescButton from './DescButton';

const ConditionButtons = ({ condition }) => {
  const [values, setValues] = useRecoilState(atom[condition]);

  const getConditionDesc = (item) => {
    const conDesc = conditionDesc[condition];
    let _item = item;
    if (item === '4WD') {
      _item = 'FWD';
    } else if (item.includes('/')) {
      _item = item.split('/')[1];
    }
    if (!conDesc) return null;
    const itemDesc = conDesc[_item];
    if (!itemDesc) return null;
    const description = {
      desc: itemDesc.desc ? itemDesc.desc : null,
      good: itemDesc.good ? itemDesc.good : null,
      bad: itemDesc.bad ? itemDesc.bad : null,
    };
    return description;
  };

  const conditions = selectList[condition];
  const buttonList = conditions.map((item) => {
    const handleClick = (e) => {
      const newValue = e.target.value;
      const newValues = setCheckedValuesArray(newValue, values);
      setValues(newValues);
    };

    const description = getConditionDesc(item);

    return (
      <Label key={item} htmlFor={item} checked={values.includes(item)}>
        {item}
        {description && <DescButton desc={description} />}
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
    <MyAccordion key={condition}>
      <MyAccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <span>{categoryDesc[condition].title}</span>
        <span>{categoryDesc[condition].comment}</span>
        <DescButton desc={categoryDesc[condition].desc} />
      </MyAccordionSummary>
      <AccordionDetails>
        <Box>{buttonList}</Box>
      </AccordionDetails>
    </MyAccordion>
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
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  color: ${(props) => (props.checked ? props.theme.colors.blueM : props.theme.colors.black900)};
  padding: 0.5rem 0 0.75rem;
  box-sizing: border-box;
  ${({ theme }) => theme.fontStyle.desc}
`;

export default ConditionButtons;
