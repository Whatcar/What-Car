import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import selectList from '../../data/selectList';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const getMarks = (condition) => {
  const cons = selectList[condition];
  const consList = cons.map((con, idx) => {
    return { value: idx, label: con };
  });
  return consList;
};

const valuetext = (value) => {
  return `${value}°C`;
};

const ConditionSlider = ({ condition }) => {
  const marks = getMarks(condition);
  const max = marks.length - 1;
  const minDistance = 1;

  const [value, setValue] = useRecoilState(atom[condition]);

  useEffect(() => {
    console.log(value);
  }, []);

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
        <Box sx={{ width: '100%' }}>
          <Slider
            defaultValue={0}
            step={null}
            max={max}
            marks={marks}
            onChange={handleChange}
            value={value}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ConditionSlider;
