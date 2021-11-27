import SelectCheck from './SelectCheck';
import SelectOne from './SelectOne';
import SelectTwo from './SelectTwo';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useRef, useState } from 'react';
import { getSessionItem } from '../../utils/searchCondition';

const AccordionComponent = ({ index }) => {
  const nowValue = () => {
    const initial = {
      grade: '',
      shape: '',
      method: '',
      fuel: '',
      cost: '',
      displacement: '',
      fuelEfficiency: '',
    };
    Object.keys(initial).map((key) => {
      const value = getSessionItem(key, '').replace('~', ' ~ ');
      initial[key] = value;
    });
    return initial;
  };

  const [selected, setSelected] = useState(nowValue);

  useEffect(() => {
    console.log('mount');
  }, []);

  const setSelectedValue = (keyName, value) => {
    const tmp = { ...selected };
    tmp[keyName] = value;
    setSelected(tmp);
  };

  const keyDict = {
    check: { 차급: 'grade', 외형: 'shape' },
    one: { 구동방식: 'method', 연료: 'fuel' },
    two: { 가격: 'cost', 배기량: 'displacement', 연비: 'fuelEfficiency' },
  };
  const keys = keyDict[index];

  const selectItem = (value) => {
    if (index === 'check') {
      return <SelectCheck keyName={value} setSelected={setSelectedValue} />;
    } else if (index === 'one') {
      return <SelectOne keyName={value} setSelected={setSelectedValue} />;
    } else {
      return <SelectTwo keyName={value} setSelected={setSelectedValue} />;
    }
  };

  const selectList = Object.keys(keys).map((key, idx) => {
    const value = keys[key];
    return (
      <Accordion key={key}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${(key, idx)}a-content`}
          id={`${(key, idx)}a-header`}
        >
          <Typography sx={{ width: '25%', flexShrink: 0 }}>{key}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{selected[value]}</Typography>
        </AccordionSummary>
        <AccordionDetails>{selectItem(value)}</AccordionDetails>
      </Accordion>
    );
  });
  return selectList;
};

export default AccordionComponent;
