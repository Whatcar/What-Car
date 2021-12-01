import Box from '@mui/material/Box';
import selectList from '../../data/selectList';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import MyAccordion, { MyAccordionSummary, MyAccordionDetails } from '../../css/MyAccordion';
import { categoryDesc } from '../../data/description';
import MySlider from '../../css/MySlider';
import DescButton from './DescButton';

const getMarks = (condition) => {
  const cons = selectList[condition];
  const consList = cons.map((con, idx) => {
    return { value: idx, label: con };
  });
  return consList;
};

const ConditionSlider = ({ condition }) => {
  const marks = getMarks(condition);
  const max = marks.length - 1;
  const minDistance = 1;

  const [value, setValue] = useRecoilState(atom[condition]);

  const handleChange = (_, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <MyAccordion key={condition}>
      <MyAccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <span>{categoryDesc[condition].title}</span>
        <span>{categoryDesc[condition].comment}</span>
        {categoryDesc[condition].desc && (
          <DescButton item={condition} desc={categoryDesc[condition].desc} />
        )}
      </MyAccordionSummary>
      <MyAccordionDetails>
        <Box sx={{ width: '100%' }}>
          <MySlider
            defaultValue={0}
            step={null}
            max={max}
            marks={marks}
            onChange={handleChange}
            value={value}
          />
        </Box>
      </MyAccordionDetails>
    </MyAccordion>
  );
};

export default ConditionSlider;
