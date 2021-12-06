import selectList from '../../data/selectList';
import { useRecoilState } from 'recoil';
import * as atom from '../../recoil/atom';
import MyAccordion, { MyAccordionSummary, MyAccordionDetails } from '../../css/MyAccordion';
import { categoryDesc } from '../../data/description';
import MySlider from '../../css/MySlider';
import DescButton from './DescButton';
import styled from 'styled-components';

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
          <DescButton item={condition} description={categoryDesc[condition]} />
        )}
      </MyAccordionSummary>
      <MyAccordionDetails>
        <Box>
          {condition === 'displacement' && (
            <Desc>
              <p>* 이해를 돕기 위한 차종별 평균 예시입니다</p>
              <div>경형차</div>
              <div>소형차</div>
              <div>중형차</div>
              <div>대형차</div>
              <div />
            </Desc>
          )}
          {condition === 'fuelEfficiency' && (
            <Desc>
              <p>* 이해를 돕기 위한 차종별 평균 예시입니다</p>
              <div />
              <div>대형차</div>
              <div>경~중형차</div>
              <div>중형 하이브리드</div>
              <div />
            </Desc>
          )}
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

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Desc = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fontSize.XS};
  color: ${({ theme }) => theme.colors.black500};
  p {
    width: 100%;
    margin-bottom: 0.75rem;
  }
  div {
    width: 20%;
  }
`;
